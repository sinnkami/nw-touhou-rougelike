import Stats from "stats.js";

export default class DebugManager {
	/** fps表示用ライブラリ */
	private static stats?: Stats;

	public static init(): Promise<void> {
		return Promise.all([
			// fps表示用ライブラリ
			this.setStats(),
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
}
