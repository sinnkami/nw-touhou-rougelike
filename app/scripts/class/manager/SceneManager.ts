import ErrorManager, { ErrorCode } from "./ErrorManager";
import { EventCode, EventManager } from "./EventManager";
import Scene_Base from "../Scene/Scene_Base";

/**
 * シーンを管理するクラス
 */
export default class SceneManager {
	// 現在処理中ののシーン
	// TODO: currentSceneでは？
	private static scene?: Scene_Base;

	// TODO: 処理中のシーンリストを作成して、そこにメニューが開いた場合は追加していくような形の方が良さそう

	/**
	 * 初期化処理
	 * @returns Promise<void>
	 */
	public static async init(): Promise<void> {
		// TODO: Scene_Bootを作成し、設定
		// MEMO: Boot要らない気がしてきた
		const event = EventManager.getEvent(EventCode.Title);
		await event.execute();
	}

	/**
	 * 現在処理中のシーンを取得
	 * @returns Scene
	 */
	public static getScene(): Scene_Base | undefined {
		return this.scene;
	}

	/**
	 * シーンを設定
	 * @param scene
	 * @returns Promise<void>
	 */
	public static setScene(scene: Scene_Base): Promise<void> {
		console.info(`シーン設定: ${this.scene ? this.scene.name : "null"} → ${scene.name}`);
		this.scene = scene;

		return Promise.resolve();
	}

	/**
	 * シーンの開始処理
	 * @returns
	 */
	public static startScene(): Promise<void> {
		const scene = this.getScene();
		if (!scene) throw ErrorManager.getError(ErrorCode.NotLoadScene);
		return scene.startScene();
	}

	/**
	 * シーンの更新処理
	 * @returns
	 */
	public static updateScene(): Promise<void> {
		const scene = this.getScene();
		if (!scene) throw ErrorManager.getError(ErrorCode.NotLoadScene);
		return scene.updateScene();
	}

	/**
	 * シーンの停止処理
	 * @returns
	 */
	public static stopScene(): Promise<void> {
		const scene = this.getScene();
		if (!scene) throw ErrorManager.getError(ErrorCode.NotLoadScene);
		return scene.stopScene();
	}
}
