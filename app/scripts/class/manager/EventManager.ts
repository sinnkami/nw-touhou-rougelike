import { Event_0001 } from "../Event/Event_0001";
import { Event_0002 } from "../Event/Event_0002";
import { Event_0003 } from "../Event/Event_0003";
import { Event_0004 } from "../Event/Event_0004";
import { Event_0005 } from "../Event/Event_0005";
import { Event_0006 } from "../Event/Event_0006";
import { Event_0007 } from "../Event/Event_0007";
import { Event_0008 } from "../Event/Event_0008";
import { Event_0009 } from "../Event/Event_0009";
import { Event_0010 } from "../Event/Event_0010";
import { Event_0011 } from "../Event/Event_0011";
import { Event_0012 } from "../Event/Event_0012";
import { Event_0013 } from "../Event/Event_0013";
import { Event_Base } from "../Event/Event_Base";

/**
 * ゲーム内イベントを管理するクラス
 */
export default class EventManager {
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
	public static getEvent(eventCode: EventCode): Event_Base {
		switch (eventCode) {
			case EventCode.Stairs:
				return new Event_0001();
			case EventCode.InvasionDungeon:
				return new Event_0002();
			case EventCode.Title:
				return new Event_0003();
			case EventCode.Lobby:
				return new Event_0004();
			case EventCode.OpenMenu:
				return new Event_0005();
			case EventCode.CloseMenu:
				return new Event_0006();
			case EventCode.StartBattle:
				return new Event_0007();
			case EventCode.BossRoom:
				return new Event_0008();
			case EventCode.OpenPartyPlanningPlace:
				return new Event_0009();
			case EventCode.ClosePartyPlanningPlace:
				return new Event_0010();
			case EventCode.OpenCreateCharacter:
				return new Event_0011();
			case EventCode.CloseCreateCharacter:
				return new Event_0012();
			case EventCode.SelectDungeon:
				return new Event_0013();
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
	OpenMenu = "5",
	CloseMenu = "6",
	StartBattle = "7",
	BossRoom = "8",
	OpenPartyPlanningPlace = "9",
	ClosePartyPlanningPlace = "10",
	OpenCreateCharacter = "11",
	CloseCreateCharacter = "12",
	SelectDungeon = "13",
}
