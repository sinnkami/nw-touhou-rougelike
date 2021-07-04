import ErrorManager, { ErrorCode } from "./ErrorManager";
import Scene_Base from "./Scene/Scene_Base";
import Scene_Test from "./Scene/Scene_Test";

export default class SceneManager {
	// 現在のシーン
	private static scene?: Scene_Base;

	public static init(): Promise<void> {
		const scene = new Scene_Test();
		return Promise.all([this.setScene(scene)]).then();
	}

	public static getScene(): Scene_Base | undefined {
		return this.scene;
	}

	public static setScene(scene: Scene_Base): Promise<void> {
		console.info(`シーン設定: ${this.scene} → ${scene.name}`);
		this.scene = scene;

		return Promise.resolve();
	}

	public static startScene(): void {
		const scene = this.getScene();
		if (!scene) throw ErrorManager.getError(ErrorCode.NotLoadScene);
		return scene.startScene();
	}

	public static updateScene(): void {
		const scene = this.getScene();
		if (!scene) throw ErrorManager.getError(ErrorCode.NotLoadScene);
		return scene.updateScene();
	}

	public static stopScene(): void {
		const scene = this.getScene();
		if (!scene) throw ErrorManager.getError(ErrorCode.NotLoadScene);
		return scene.stopScene();
	}
}
