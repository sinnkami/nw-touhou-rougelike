import { IStoreCharacter } from "./IStoreCharacter";

/**
 * ゲーム内パーティ情報
 */
export interface IStoreParty extends IStoreCharacter {
	/** パーティID */
	partyId: string;
	/** 並び順 */
	order: number;
}
