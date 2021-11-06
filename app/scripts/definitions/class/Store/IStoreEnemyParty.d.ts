import { IDataEnemy } from "../Data/IDataEnemy";

/**
 * 敵パーティ情報
 */
export interface IStoreEnemyParty extends IDataEnemy {
	/** パーティID */
	partyId: string;
	/** 並び順 */
	order: number;
}
