import Actor from "../../../modules/field/Actor";

/**
 * ゲーム内パーティ情報
 */
export interface IStorePartyDict {
	[partyId: string]: Actor;
}
