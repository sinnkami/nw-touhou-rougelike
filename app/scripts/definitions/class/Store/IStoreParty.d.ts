import Actor from "../../../modules/field/Actor";
import { IStoreCharacter } from "./IStoreCharacter";

/**
 * ゲーム内パーティ情報
 */
export interface IStorePartyDict {
	[partyId: string]: Actor;
}
