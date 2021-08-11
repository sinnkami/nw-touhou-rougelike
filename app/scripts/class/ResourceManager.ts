import { Loader, Texture } from "pixi.js";

/**
 * Resourceの読み込みを行うマネージャークラス
 */
export default class ResourceManager {
	/**
	 * 初期化処理
	 * @returns Promise<void>
	 */
	public static init(): Promise<void> {
		return Promise.all([]).then();
	}

	/**
	 * 指定されたパスのテクスチャを取得
	 * @param path
	 * @returns Promise<Texture>
	 */
	public static getTexture(path: string): Promise<Texture> {
		const loader = this.getLoader();

		const resources = loader.resources[path];

		// TODO:あとでエラー内容設定
		if (!resources) throw new Error("not load");
		if (!resources.isComplete || !resources.texture) throw new Error("not load");

		return Promise.resolve(resources.texture);
	}

	/**
	 * 指定されたパスのリソースを読み込み
	 * TODO: 成功したかどうかぐらい入れた方が良い気がする
	 * @param paths
	 * @returns Promise<boid>
	 */
	public static loadResources(paths: string[]): Promise<void> {
		return new Promise<void>(resolve => {
			const loader = this.getLoader();

			paths.forEach(path => loader.add(path));

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
