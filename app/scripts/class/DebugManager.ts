/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Loader } from "pixi.js";
import Stats from "stats.js";

export default class DebugManager {
	/** fps表示用ライブラリ */
	private static stats?: Stats;

	public static init(): Promise<void> {
		return Promise.all([
			// fps表示用ライブラリ
			this.setStats(),
			this.setProcessLogs(),
		]).then();
	}

	public static updateStats(): Promise<void> {
		if (this.stats) {
			this.stats.update();
		}
		return Promise.resolve();
	}

	private static setStats(): Promise<void> {
		this.stats = new Stats();
		this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
		document.body.appendChild(this.stats.dom);
		return Promise.resolve();
	}

	private static setProcessLogs(): Promise<void> {
		// Loader.shared.onStart.add(loader => console.info("onStart"));
		Loader.shared.onProgress.add((_loader: any, resource: { name: any }) =>
			console.info("loading...", `[${resource.name}]`)
		);
		// Loader.shared.onLoad.add((loader, resource) => console.info("load"));
		Loader.shared.onComplete.add((_loader: any, resources: any) => console.info("complete!!! for ", resources));
		Loader.shared.onError.add((error: any, _loader: any, _resource: any) => {
			throw error;
		});
		return Promise.resolve();
	}
}
