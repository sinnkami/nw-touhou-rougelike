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
import { Event_BattleInit } from "../Event/Battle/Event_BattleInit";
import { Event_BattleStart } from "../Event/Battle/Event_BattleStart";
import { Event_SelectedTrun } from "../Event/Battle/Event_SelectedTrun";
import { Event_TurnStart } from "../Event/Battle/Event_TurnStart";
import { Event_CommandSelect } from "../Event/Battle/Event_CommandSelect";
import { Event_CommandExecute } from "../Event/Battle/Event_CommandExecute";
import { Event_CommandEnd } from "../Event/Battle/Event_CommandEnd";
import { Event_TurnEnd } from "../Event/Battle/Event_TurnEnd";
import { Event_BattleEnd } from "../Event/Battle/Event_BattleEnd";
import { Event_BattleResult } from "../Event/Battle/Event_BattleResult";

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
			case EventName.BattleInit:
				return new Event_BattleInit();
			case EventName.BattleStart:
				return new Event_BattleStart();
			case EventName.BattleSelectedTrun:
				return new Event_SelectedTrun();
			case EventName.BattleTrunStart:
				return new Event_TurnStart();
			case EventName.BattleCommandSelect:
				return new Event_CommandSelect();
			case EventName.BattleCommandExecute:
				return new Event_CommandExecute();
			case EventName.BattleCommandEnd:
				return new Event_CommandEnd();
			case EventName.BattleTrunEnd:
				return new Event_TurnEnd();
			case EventName.BattleEnd:
				return new Event_BattleEnd();
			case EventName.BattleResult:
				return new Event_BattleResult();
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
	BossRoom = "BossRoom",
	OpenEditParty = "OpenEditParty",
	OpenCreateCharacter = "OpenCreateCharacter",
	SceneToSelectDungeon = "SceneToSelectDungeon",

	// 戦闘関連
	SceneToBattle = "SceneToBattle",
	BattleInit = "BattleInit",
	BattleStart = "BattleStart",
	BattleSelectedTrun = "BattleSelectedTrun",
	BattleTrunStart = "BattleTrunStart",
	BattleCommandSelect = "BattleCommandSelect",
	BattleCommandExecute = "BattleCommandExecute",
	BattleCommandEnd = "BattleCommandEnd",
	BattleTrunEnd = "BattleTrunEnd",
	BattleEnd = "BattleEnd",
	BattleResult = "BattleResult",
}
