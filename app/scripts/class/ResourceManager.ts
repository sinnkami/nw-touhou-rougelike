import { Loader, Texture } from "pixi.js";

export default class ResourceManager {
	public static init(): Promise<void> {
		return Promise.all([]).then();
	}

	public static getTexture(path: string): Promise<Texture> {
		const loader = this.getLoader();

		const resources = loader.resources[path];

		// TODO:あとでエラー内容設定
		if (!resources) throw new Error("not load");
		if (!resources.isComplete || !resources.texture) throw new Error("not load");

		return Promise.resolve(resources.texture);
	}

	public static loadResources(paths: string[]): Promise<void> {
		return new Promise<void>(resolve => {
			const loader = this.getLoader();

			paths.forEach(path => loader.add(path));

			loader.load(() => {
				resolve();
			});
		});
	}

	private static getLoader(): Loader {
		return Loader.shared;
	}
}
