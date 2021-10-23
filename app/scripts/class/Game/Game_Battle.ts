import { IDataEnemy } from "../../definitions/class/Data/IDataEnemy";
import DataManager from "../Manager/DataManager";
import GameManager from "../Manager/GameManager";
import { Game_Base } from "./Game_Base";

export default class Game_Battle extends Game_Base {
	public battleStart(enemyGroupId: string): void {
		GameManager.enemyGroup.setEnemyGroup(enemyGroupId);
		const enemyGroupInfoList = GameManager.enemyGroup.getEnemyGroupInfoList();
		enemyGroupInfoList.forEach(enemyGroupInfo => {
			const enemyId = enemyGroupInfo.enemyId;
			GameManager.enemy.setEnemy(enemyId);
		});
	}
}
