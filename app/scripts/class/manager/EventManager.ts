import { Event_DungeonHierarchy } from "../Event/Dungeon/Event_DungeonHierarchy";
import { Event_SceneToDungeon } from "../Event/Scene/Event_SceneToDungeon";
import { Event_SceneToTitle } from "../Event/Scene/Event_SceneToTitle";
import { Event_SceneToLobby } from "../Event/Scene/Event_SceneToLobby";
import { Event_OpenDungeonMenu } from "../Event/Menu/Event_OpenDungeonMenu";
import { Event_CloseScene } from "../Event/System/Event_CloseScene";
import { Event_SceneToBattle } from "../Event/Scene/Event_SceneToBattle";
import { Event_BossRoom } from "../Event/Dungeon/Event_BossRoom";
import { Event_OpenEditParty } from "../Event/Menu/Event_OpenEditParty";
import { Event_OpenCreateCharacter } from "../Event/Menu/Event_OpenCreateCharacter";
import { Event_SceneToSelectDungeon } from "../Event/Scene/Event_SceneToSelectDungeon";
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
	public static getEvent(eventName: EventName): Event_Base {
		switch (eventName) {
			case EventName.DungeonHierarchy:
				return new Event_DungeonHierarchy();
			case EventName.SceneToDungeon:
				return new Event_SceneToDungeon();
			case EventName.SceneToTitle:
				return new Event_SceneToTitle();
			case EventName.SceneToLobby:
				return new Event_SceneToLobby();
			case EventName.OpenDungeonMenu:
				return new Event_OpenDungeonMenu();
			case EventName.CloseScene:
				return new Event_CloseScene();
			case EventName.SceneToBattle:
				return new Event_SceneToBattle();
			case EventName.BossRoom:
				return new Event_BossRoom();
			case EventName.OpenEditParty:
				return new Event_OpenEditParty();
			case EventName.OpenCreateCharacter:
				return new Event_OpenCreateCharacter();
			case EventName.SceneToSelectDungeon:
				return new Event_SceneToSelectDungeon();
			default:
				throw new Error("no event");
		}
	}
}

export enum EventName {
	DungeonHierarchy = "DungeonHierarchy",
	SceneToDungeon = "SceneToDungeon",
	SceneToTitle = "SceneToTitle",
	SceneToLobby = "SceneToLobby",
	OpenDungeonMenu = "OpenDungeonMenu",
	CloseScene = "CloseScene",
	SceneToBattle = "SceneToBattle",
	BossRoom = "BossRoom",
	OpenEditParty = "OpenEditParty",
	OpenCreateCharacter = "OpenCreateCharacter",
	SceneToSelectDungeon = "SceneToSelectDungeon",
}
