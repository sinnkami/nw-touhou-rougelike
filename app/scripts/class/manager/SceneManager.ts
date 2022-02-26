import EventManager, { EventName } from "./EventManager";
import Scene_Base from "../Scene/Scene_Base";
import ErrorManager, { ErrorCode } from "./ErrorManager";

/**
 * シーンを管理するクラス
 */
export default class SceneManager {
	// 現在処理中ののシーン
	private static get currentScene(): Scene_Base | undefined {
		return this.sceneList[this.sceneList.length - 1];
	}

	// 現在実行中のシーンリスト
	private static sceneList: Scene_Base[] = [];

	// TODO: 処理中のシーンリストを作成して、そこにメニューが開いた場合は追加していくような形の方が良さそう

	/**
	 * 初期化処理
	 * @returns Promise<void>
	 */
	public static async init(): Promise<void> {
		// TODO: Scene_Bootを作成し、設定
		// MEMO: Boot要らない気がしてきた
		const event = EventManager.getEvent(EventName.SceneToTitle);
		await event.execute();
	}

	/**
	 * 現在処理中のシーンを取得
	 * @returns Scene
	 */
	public static getScene(): Scene_Base | undefined {
		return this.currentScene;
	}

	/**
	 * 実行するシーンを追加
	 * @param scene
	 * @returns Promise<void>
	 */
	public static addScene(scene: Scene_Base): Promise<void> {
		console.info(`シーン設定: ${this.currentScene ? this.currentScene.name : "null"} → ${scene.name}`);
		this.sceneList.push(scene);

		return Promise.resolve();
	}

	/**
	 * 実行中のシーンを削除
	 */
	public static removeScene(name?: string): Promise<void> {
		if (name) {
			this.sceneList = this.sceneList.filter(v => v.name !== name);
		} else {
			this.sceneList.pop();
		}
		return Promise.resolve();
	}

	/**
	 * シーンの開始処理
	 * @param isReset 初期化フラグ
	 * @returns
	 */
	public static async startScene(isReset?: boolean): Promise<void> {
		const scene = this.getScene();
		if (!scene) throw ErrorManager.getError(ErrorCode.NotLoadScene);

		if (isReset) {
			scene.init();
		}

		scene.startScene();
	}

	/**
	 * シーンの更新処理
	 * @returns
	 */
	public static async updateScene(): Promise<void> {
		const scene = this.getScene();
		if (!scene) throw ErrorManager.getError(ErrorCode.NotLoadScene);
		scene.updateScene();
	}

	/**
	 * シーンの停止処理
	 * @returns
	 */
	public static async stopScene(): Promise<void> {
		const scene = this.getScene();
		if (!scene) throw ErrorManager.getError(ErrorCode.NotLoadScene);

		scene.stopScene();
	}
}
