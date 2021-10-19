import { IDataEnemy } from "../../definitions/class/Data/IDataEnemy";
import DataManager from "../Manager/DataManager";
import { Game_Base } from "./Game_Base";
// TODO: エネミーグループ必要層
export default class Game_Battle extends Game_Base {
	private enemyList: IDataEnemy[] = [];

	private curentEnemyGroupId: string = "";

	public init(): void {
		this.enemyList = [];
		this.curentEnemyGroupId = "";
	}

	public battleStart(enemyGroupId: string): void {
		this.init();

		const enemyGroupData = DataManager.enemyGroup.get(enemyGroupId);
		if (!enemyGroupData) throw new Error("存在しないエンカウント情報です");
		for (const enemyId of enemyGroupData.enemyList) {
			const enemyData = DataManager.enemy.get(enemyId);
			if (!enemyData) throw new Error("存在しないエネミー情報です");

			this.enemyList.push(enemyData);
		}
	}

	public getEnemyList(): IDataEnemy[] {
		return this.enemyList;
	}
}
