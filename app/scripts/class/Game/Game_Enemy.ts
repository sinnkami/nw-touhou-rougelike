import { IDataEnemy } from "../../definitions/class/Data/IDataEnemy";
import DataManager from "../Manager/DataManager";
import { Game_Base } from "./Game_Base";

export default class Game_Enemy extends Game_Base {
	private get enemyList(): IDataEnemy[] {
		return DataManager.enemy.getAll();
	}

	public getEnemy(enemyId: string): IDataEnemy {
		const enemy = this.enemyList.find(v => v.enemyId === enemyId);
		if (!enemy) throw new Error("設定されていないエネミーです");
		return enemy;
	}
}
