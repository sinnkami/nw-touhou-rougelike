import { Event_0001 } from "./Event/Event_0001";
import { Event_Base } from "./Event/Event_Base";

/**
 * ゲーム内イベントを管理するクラス
 */
export class EventManager {
	/**
	 * 初期化処理
	 * @returns Promise<void>
	 */
	public static init(): Promise<void> {
		return Promise.all([]).then();
	}

	/**
	 * イベント内容を取得
	 */
	public static getEvent(eventCode: EventCode): Event_Base | undefined {
		switch (eventCode) {
			case EventCode.Stairs:
				return new Event_0001();
		}
	}
}

export enum EventCode {
	Stairs = "1",
}
