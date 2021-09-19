import { Event_0001 } from "./Event/Event_0001";
import { Event_0002 } from "./Event/Event_0002";
import { Event_0003 } from "./Event/Event_0003";
import { Event_0004 } from "./Event/Event_0004";
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
	public static getEvent(eventCode: EventCode | undefined): Event_Base {
		switch (eventCode) {
			case EventCode.Stairs:
				return new Event_0001();
			case EventCode.InvasionDungeon:
				return new Event_0002();
			case EventCode.Title:
				return new Event_0003();
			case EventCode.Lobby:
				return new Event_0004();
			default:
				throw new Error("no event");
		}
	}
}

export enum EventCode {
	Stairs = "1",
	InvasionDungeon = "2",
	Title = "3",
	Lobby = "4",
}
