import ErrorManager, { ErrorCode } from "./ErrorManager";
import Scene_Base from "./Scene/Scene_Base";
import Scene_Test from "./Scene/Scene_Test";

export default class SceneManager {
	// 現在のシーン
	private static scene?: Scene_Base;

	public static init(): void {
		const scene = new Scene_Test();
		this.setScene(scene);
	}

	public static getScene(): Scene_Base | undefined {
		return this.scene;
	}

	public static setScene(scene: Scene_Base): void {
		console.info(`シーン設定: ${this.scene} → ${scene.name}`);
		this.scene = scene;
	}

	public static startScene(): Promise<void> {
		const scene = this.getScene();
		if (!scene) throw ErrorManager.getError(ErrorCode.NotLoadScene);
		return scene.startScene();
	}

	public static updateScene(): Promise<void> {
		const scene = this.getScene();
		if (!scene) throw ErrorManager.getError(ErrorCode.NotLoadScene);
		return scene.updateScene();
	}

	public static stopScene(): Promise<void> {
		const scene = this.getScene();
		if (!scene) throw ErrorManager.getError(ErrorCode.NotLoadScene);
		return scene.stopScene();
	}
}
