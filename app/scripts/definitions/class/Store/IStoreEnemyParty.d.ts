import { ICharacter } from "../../modules/field/ICharacter";

// TODO: そのうち必要になるかもしれない
interface IStoreEnemy extends ICharacter {
	enemyId: string;
}

/**
 * 敵パーティ情報
 */
export interface IStoreEnemyParty extends IStoreEnemy {
	/** パーティID */
	partyId: string;
	/** 並び順 */
	order: number;
}
