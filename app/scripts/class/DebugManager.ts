import Stats from "stats.js";

export default class DebugManager {
	/** fps表示用ライブラリ */
	private static stats: Stats = new Stats();

	public static init(): void {
		// fps表示用ライブラリ
		const stats = this.stats;
		stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
		document.body.appendChild(stats.dom);
	}

	public static updateStats(): void {
		this.stats.update();
	}
}