/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Loader, Texture } from "pixi.js";
import Stats from "stats.js";
/**
 * デバッグ機能を管理するクラス
 */
export default class DebugManager {
	// fps表示用ライブラリ
	private static stats?: Stats;

	/**
	 * 初期化処理
	 * @returns Promise<void>
	 */
	public static init(): Promise<void> {
		return Promise.all([
			// fps表示用ライブラリ
			this.setStats(),
			// Resourceを読み込んだ際のログ
			this.setProcessLogs(),
			// pixi.jsの邪魔なログを消す
			this.overrideAddToCacheForPixiJsTexture(),
		]).then();
	}

	/**
	 * fps表示用ライブラリを更新
	 * @returns Promise<void>
	 */
	public static updateStats(): Promise<void> {
		if (this.stats) {
			this.stats.update();
		}
		return Promise.resolve();
	}

	/**
	 * fps表示用ライブラリを設定
	 * @returns Promise<void>
	 */
	private static setStats(): Promise<void> {
		this.stats = new Stats();
		this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
		document.body.appendChild(this.stats.dom);
		return Promise.resolve();
	}

	/**
	 * Resourceを読み込む際や終了時、エラー時にログを出力するように設定
	 * @returns Promise<void>
	 */
	private static setProcessLogs(): Promise<void> {
		// Loader.shared.onStart.add(loader => console.info("onStart"));
		Loader.shared.onProgress.add((_loader: any, resource: { name: any }) =>
			console.info("loading...", `[${resource.name}]`)
		);
		// Loader.shared.onLoad.add((loader, resource) => console.info("load"));
		Loader.shared.onComplete.add((_loader: any, resources: any): void => {
			console.info("complete!!! for ", resources);
		});
		Loader.shared.onError.add((error: any, _loader: any, _resource: any): void => {
			throw error;
		});
		return Promise.resolve();
	}

	/**
	 * pixi.jsにてキャッシュされているテクスチャを再度ロードしようとした際に出力されるwarnが邪魔なので表示しないように上書きする
	 * @returns
	 */
	private static overrideAddToCacheForPixiJsTexture(): Promise<void> {
		const originAddToCache = Texture.addToCache;
		const originWarn = console.warn;
		Texture.addToCache = function (texture, id) {
			console.warn = () => {
				return;
			};
			originAddToCache.call(undefined, texture, id);
			console.warn = originWarn;
		};

		return Promise.resolve();
	}
}
