import { Loader, Texture } from "pixi.js";
import { ILoadResourceInfo } from "../../definitions/class/Manager/IResourceManager";

/**
 * Resourceを管理するクラス
 */
export default class ResourceManager {
	// 読み込まれているResource辞書
	private static loadResourceDict: { [name: string]: string } = {};

	/**
	 * 初期化処理
	 * @returns Promise<void>
	 */
	public static init(): Promise<void> {
		return Promise.all([]).then();
	}

	/**
	 * 指定されたパスのテクスチャを取得
	 * @param name
	 * @returns Promise<Texture>
	 */
	public static getTexture(name: string): Promise<Texture> {
		const loader = this.getLoader();

		const path = this.loadResourceDict[name];
		const resources = loader.resources[path];

		// TODO:あとでエラー内容設定
		if (!resources) throw new Error(`not load (${name})`);
		if (!resources.isComplete || !resources.texture) throw new Error(`not load (${name})`);

		return Promise.resolve(resources.texture);
	}

	/**
	 * 指定されたパスのリソースを読み込み
	 * TODO: 成功したかどうかぐらい入れた方が良い気がする
	 * @param ILoadResourceInfo
	 * @returns Promise<boid>
	 */
	public static loadResources(...list: ILoadResourceInfo[]): Promise<void> {
		return new Promise<void>(resolve => {
			const loader = this.getLoader();

			list.forEach(resourceInfo => {
				const path = resourceInfo.path;
				const name = resourceInfo.name || resourceInfo.path;

				if (!loader.resources[path]) loader.add(path);
				if (!this.loadResourceDict[name] || (this.loadResourceDict[name] && resourceInfo.isOverwrite)) {
					this.loadResourceDict[name] = path;
				}
			});

			loader.load(() => {
				resolve();
			});
		});
	}

	/**
	 * Resourceローダーを取得
	 * @returns Loader
	 */
	private static getLoader(): Loader {
		return Loader.shared;
	}
}
