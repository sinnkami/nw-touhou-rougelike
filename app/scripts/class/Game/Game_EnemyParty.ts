import { IDataEnemy } from "../../definitions/class/Data/IDataEnemy";
import { IGameEnemyGroupInfo } from "../../definitions/class/Game/IGameEnemyGroup";
import { IStoreCharacter } from "../../definitions/class/Store/IStoreCharacter";
import { IStoreEnemyPartyDict } from "../../definitions/class/Store/IStoreEnemyParty";
import Enemy from "../../modules/field/Enemy";
import DataManager from "../Manager/DataManager";
import { ErrorCode } from "../Manager/ErrorManager";
import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
import { Game_Base } from "./Game_Base";

/**
 * 現在の敵パーティに関する情報を操作するクラス
 */
export default class Game_EnemyParty extends Game_Base {
	private get menberDict(): IStoreEnemyPartyDict {
		return StoreManager.enemyParty.getAll();
	}

	public init(): void {
		StoreManager.enemyParty.init();
		return;
	}

	/**
	 * 指定されたエネミーの情報を取得
	 * @param order
	 * @returns
	 */
	public getMenber(partyId: string): Enemy {
		const enemy = this.menberDict[partyId];

		if (!enemy) throw new Error("指定されたエネミーはパーティにいません");

		return enemy;
	}

	/**
	 * 先頭のエネミーを取得
	 * @returns
	 */
	public getFirstEnemyParty(): Enemy {
		// TODO: 先頭の番号、固定値か何かにしたい
		const enemy = this.getEnemyPartyList()[0];
		if (!enemy) throw new Error("指定されたエネミーはパーティにいません");

		return enemy;
	}

	/**
	 * 全エネミーの情報を取得
	 * @param order
	 * @returns
	 */
	public getEnemyPartyList(): Enemy[] {
		return Object.values(this.menberDict);
	}

	public getMenberKeys(): string[] {
		return Object.keys(this.menberDict);
	}

	public setEnemyParty(enemyPartyId: string): void {
		const enemyParty = DataManager.enemyParty.get(enemyPartyId);
		if (!enemyParty) throw new Error("存在しないエネミーグループ");

		StoreManager.enemyParty.setEnemyPartyId(enemyPartyId);
		enemyParty.enemyList.forEach((enemyId: string, index: number) => {
			const enemyData = GameManager.enemy.getEnemy(enemyId);
			StoreManager.enemyParty.add(new Enemy(enemyData));
		});
	}

	/**
	 * 指定されたエネミーのキャラ情報を取得
	 * @param order
	 */
	public getEnemyInCharacterInfo(partyId: string): IDataEnemy {
		const enemy = this.getMenber(partyId);
		const character = GameManager.enemy.getEnemy(enemy.enemyId);
		return character;
	}
}
