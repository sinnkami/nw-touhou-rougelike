import { ICanvasLayer } from "../definitions/class/IManager";
import Canvas from "../modules/Canvas/Canvas";
import Const, { CanvasLayer } from "./Const";
import DebugManager from "./DebugManager";
import ErrorManager, { ErrorCode } from "./ErrorManager";
import Scene_Base from "./Scene/Scene_Base";
import Scene_Test from "./Scene/Scene_Test";

export default class Manager {
	// 現在のシーン
	private static scene?: Scene_Base;
	private static canvas: ICanvasLayer = {};


	public static gameStart(): void {
		DebugManager.init();
		this.setCanvasLayer();

		const scene = new Scene_Test();
		this.setScene(scene);

		scene.startScene();
	}

	public static gameStop(): void {

	}

	public static getScene(): Scene_Base | undefined {
		return this.scene;
	}

	public static setScene(scene: Scene_Base): void {
		console.info(`シーン設定: ${this.scene} → ${scene.getName()}`);
		scene.startScene();
		this.scene = scene;
	}

	public static getCanvas(layerName: CanvasLayer): Canvas {
		const canvas = this.canvas[layerName];
		if (!canvas) throw ErrorManager.getError(ErrorCode.CanvasNotFound);
		return canvas;
	}

	private static setCanvasLayer(): void {
		this.canvas = {
			background: new Canvas(Const.size.width, Const.size.height),
		}
	}

}