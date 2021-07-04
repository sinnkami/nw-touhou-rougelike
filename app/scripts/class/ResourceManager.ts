import { Loader, Texture } from "pixi.js";

export default class ResourceManager {
	public static getTexture(path: string): Promise<Texture> {
		const loader = this.getLoader();

		const resources = loader.resources[path];
		if (!resources) {
			return this.loadResources([path]).then(() => this.getTexture(path));
		}

		// TODO:あとでエラー内容設定
		if (!resources.isComplete || !resources.texture) return this.getTexture(path);

		return Promise.resolve(resources.texture);
	}

	private static loadResources(paths: string[]): Promise<void> {
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
