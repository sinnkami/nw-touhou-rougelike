import { IStoreEnemyParty } from "../../definitions/class/Store/IStoreEnemyParty";
import Store_Base from "./Store_Base";

// 最大人数
// TODO: 定義場所の変更
const LIMIT_MENBER = 3;

/**
 * 現在の敵パーティーを管理するクラス
 */
export default class Store_EnemyParty extends Store_Base {
	// メンバーリスト
	private menberList: IStoreEnemyParty[] = [];
	// 現在戦闘中の敵パーティID
	private enemyPartyId: string = "";

	public async init(): Promise<void> {
		this.menberList = [];
		this.enemyPartyId = "";
	}

	public getAll(): IStoreEnemyParty[] {
		return this.menberList;
	}

	public get(id: string): IStoreEnemyParty | undefined {
		return this.menberList.find(v => v.partyId === id);
	}

	public getEnemyPartyId(): string {
		return this.enemyPartyId;
	}

	public setEnemyPartyId(enemyPartyId: string): void {
		this.enemyPartyId = enemyPartyId;
	}

	// TODO: 必要になるかもしれないので一応
	public add(...partys: IStoreEnemyParty[]): void {
		// TODO: エラーにするかは悩みどころ
		// MEMO: キャッチさせてしょりったほうがよいかなぁ・・・？
		if (partys.length + this.menberList.length > LIMIT_MENBER)
			throw new Error("パーティ上限を超えて追加しようとしました");
		this.menberList = this.menberList.concat(partys);
	}
}
