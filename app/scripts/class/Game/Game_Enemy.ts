import { IDataEnemy } from "../../definitions/class/Data/IDataEnemy";
import DataManager from "../Manager/DataManager";
import { Game_Base } from "./Game_Base";

export default class Game_Enemy extends Game_Base {
	private enemyList: IDataEnemy[] = [];
	public getEnemy(enemyId: string): IDataEnemy {
		const enemy = this.enemyList.find(v => v.enemyId === enemyId);
		if (!enemy) throw new Error("所持していないキャラクターです");
		return enemy;
	}

	public setEnemy(enemyId: string): void {
		const enemy = DataManager.enemy.get(enemyId);
		if (!enemy) throw new Error("敵の情報が存在しません");
		this.enemyList.push(enemy);
	}
}
