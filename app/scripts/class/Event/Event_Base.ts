import { EventManager } from "../EventManager";
import LoadManager from "../LoadManager";

/**
 * イベント汎用クラス
 */
export class Event_Base {
	/**
	 * イベントを実行
	 * @returns
	 */
	public async execute(): Promise<void> {
		EventManager.executeEvent();
		await LoadManager.start("test");
		return Promise.resolve();
	}
}
