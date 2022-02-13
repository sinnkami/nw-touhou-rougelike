import { IDataBoss } from "../../definitions/class/Data/IDataBoss";
import DataManager from "../Manager/DataManager";
import GameManager from "../Manager/GameManager";
import { Game_Base } from "./Game_Base";

export default class Game_Boss extends Game_Base {
	private get bossInfoList(): IDataBoss[] {
		return DataManager.boss.getAll();
	}

	public getBossMessages(): IDataBoss {
		const dungeonInfo = GameManager.dungeon.getCurrentDungeon();

		const bossMessages = this.bossInfoList.find(v => v.bossId === dungeonInfo.bossId);
		if (!bossMessages) throw new Error("ボス戦の情報が存在しません");

		return bossMessages;
	}
}
