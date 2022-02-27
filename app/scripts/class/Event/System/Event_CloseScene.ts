import SceneManager from "../../Manager/SceneManager";
import { Event_Base } from "../Event_Base";
import LoadManager from "../../Manager/LoadManager";

/**
 * シーンを閉じる
 */
export class Event_CloseScene extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		await this.startLoading();

		await SceneManager.stopScene();

		await SceneManager.startScene(true);

		return this.endLoading();
	}
}
