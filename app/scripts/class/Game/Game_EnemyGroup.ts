import { IDataEnemy } from "../../definitions/class/Data/IDataEnemy";
import { IGameEnemyGroupInfo } from "../../definitions/class/Game/IGameEnemyGroup";
import { IStoreCharacter } from "../../definitions/class/Store/IStoreCharacter";
import { IStoreParty } from "../../definitions/class/Store/IStoreParty";
import DataManager from "../Manager/DataManager";
import { ErrorCode } from "../Manager/ErrorManager";
import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
import { Game_Base } from "./Game_Base";

/**
 * 現在のエネミーグループに関する情報を操作するクラス
 */
export default class Game_EnemyGroup extends Game_Base {
	private enemyList: IGameEnemyGroupInfo[] = [];

	private curentEnemyGroupId: string = "";

	public init(): void {
		this.enemyList = [];
		this.curentEnemyGroupId = "";
	}

	/**
	 * 指定されたエネミーの情報を取得
	 * @param order
	 * @returns
	 */
	public getEnemyGroupInfo(order: number): IGameEnemyGroupInfo {
		const enemy = this.enemyList.find(v => v.order === order);

		if (!enemy) throw new Error("指定された並び位置にエネミーはいません");

		return enemy;
	}

	/**
	 * 全エネミーの情報を取得
	 * @param order
	 * @returns
	 */
	public getEnemyGroupInfoList(): IGameEnemyGroupInfo[] {
		return this.enemyList;
	}

	public setEnemyGroup(enemyGroupId: string): void {
		this.curentEnemyGroupId = enemyGroupId;
		const enemyGroup = DataManager.enemyGroup.get(enemyGroupId);
		if (!enemyGroup) throw new Error("存在しないエネミーグループ");
		enemyGroup.enemyList.forEach((enemyId: string, index: number) => {
			this.enemyList.push({
				enemyId,
				order: index + 1,
			});
		});
	}

	/**
	 * 先頭のエネミーを取得
	 * @returns
	 */
	public getFirstEnemyGroupInfo(): IGameEnemyGroupInfo {
		// TODO: 先頭の番号、固定値か何かにしたい
		return this.getEnemyGroupInfo(1);
	}

	/**
	 * 指定されたエネミーのキャラ情報を取得
	 * @param order
	 */
	public getEnemyInCharacterInfo(order: number): IDataEnemy {
		const enemy = this.getEnemyGroupInfo(order);
		const character = GameManager.enemy.getEnemy(enemy.enemyId);
		return character;
	}
}
