import { IStoreEnemyPartyDict } from "../../definitions/class/Store/IStoreEnemyParty";
import Enemy from "../../modules/field/Enemy";
import Store_Base from "./Store_Base";

// 最大人数
// TODO: 定義場所の変更
const LIMIT_MENBER = 3;

/**
 * 現在の敵パーティーを管理するクラス
 */
export default class Store_EnemyParty extends Store_Base {
	// メンバーリスト
	private menberDict: IStoreEnemyPartyDict = {};
	// 現在戦闘中の敵パーティID
	private enemyPartyId: string = "";

	private get size(): number {
		return Object.values(this.menberDict).length;
	}

	public async init(): Promise<void> {
		this.menberDict = {};
		this.enemyPartyId = "";
	}

	public getAll(): IStoreEnemyPartyDict {
		return this.menberDict;
	}

	public get(id: string): Enemy | undefined {
		return this.menberDict[id];
	}

	public getEnemyPartyId(): string {
		return this.enemyPartyId;
	}

	public setEnemyPartyId(enemyPartyId: string): void {
		this.enemyPartyId = enemyPartyId;
	}

	// TODO: 必要になるかもしれないので一応
	public add(...partys: Enemy[]): void {
		// TODO: エラーにするかは悩みどころ
		// MEMO: キャッチさせてしょりったほうがよいかなぁ・・・？
		if (partys.length + this.size > LIMIT_MENBER) throw new Error("パーティ上限を超えて追加しようとしました");
		partys.forEach((v, i) => (this.menberDict[i] = v));
	}
}
