import Canvas from "../modules/Canvas/Canvas";
import Const from "./Const";
import DebugManager from "./DebugManager";
import ErrorManager, { ErrorCode } from "./ErrorManager";
import Scene_Base from "./Scene/Scene_Base";
import Scene_Test from "./Scene/Scene_Test";

export default class GameManager {
	// 現在のシーン
	private static scene?: Scene_Base;
	private static canvas: Canvas;

	private static isLoop = false;

	public static frameCount = 0;

	public static init(): void {
		DebugManager.init();
		this.setCanvas();

		const scene = new Scene_Test();
		this.setScene(scene);

		scene.startScene().then(this.gameStart.bind(this));
	}

	public static gameStart(): void {
		this.isLoop = true;
		requestAnimationFrame(this.gameLoop);
	}

	public static gameStop(): void {
		this.isLoop = false;
	}

	public static getScene(): Scene_Base | undefined {
		console.log(this);
		return this.scene;
	}

	public static setScene(scene: Scene_Base): void {
		console.info(`シーン設定: ${this.scene} → ${scene.getName()}`);
		scene.startScene();
		this.scene = scene;
	}

	public static getCanvas(): Canvas {
		const canvas = this.canvas;
		if (!canvas) throw ErrorManager.getError(ErrorCode.CanvasNotFound);
		return canvas;
	}

	private static setCanvas(): void {
		this.canvas = new Canvas(Const.size.width, Const.size.height);
	}

	private static gameLoop(): void {
		if (!GameManager.isLoop) return;

		// 現在のシーンを取得
		const scene = GameManager.getScene();
		if (!scene) throw ErrorManager.getError(ErrorCode.NotLoadScene);

		GameManager.frameCount++;
		DebugManager.updateStats();
		console.log(GameManager.frameCount);
		Promise.all([scene.updateScene()]).then(() => {
			requestAnimationFrame(GameManager.gameLoop);
		});
	}
}
