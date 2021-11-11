import Enemy from "../../../modules/field/Enemy";
import { ICharacter } from "../../modules/field/ICharacter";

// TODO: そのうち必要になるかもしれない
interface IStoreEnemy extends ICharacter {
	enemyId: string;
}

/**
 * 敵パーティ情報
 */
export interface IStoreEnemyPartyDict {
	[partyId: string]: Enemy;
}
