import { ICharacter } from "../../modules/field/ICharacter";

/**
 * ゲーム内キャラ情報
 * MEMO: Data_Characterが保持しているで変更されないならば極力保存しない
 * TODO: データの調整
 */
export interface IStoreCharacter extends ICharacter {
	/** 固有ID */
	storeId: string;
	/** キャラID */
	characterId: string;
}
