import { IStoreCharacter } from "../../definitions/class/Store/IStoreCharacter";
import { IStorePartyDict } from "../../definitions/class/Store/IStoreParty";
import Actor from "../../modules/field/Actor";
import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
import { Game_Base } from "./Game_Base";

/**
 * 現在のパーティーメンバーに関する情報を操作するクラス
 */
export default class Game_Party extends Game_Base {
	private get menberDict(): IStorePartyDict {
		return StoreManager.party.getAll();
	}

	/**
	 * 指定されたメンバーの情報を取得
	 * @param partyId
	 * @returns
	 */
	public getMenber(partyId: string): Actor {
		const menber = this.menberDict[partyId];

		if (!menber) throw new Error("指定された並び位置にメンバーはいません");

		return menber;
	}

	/**
	 * 全メンバーの情報を取得
	 * @param order
	 * @returns
	 */
	public getMenberList(): Actor[] {
		return Object.values(this.menberDict);
	}

	public getMenberKeys(): string[] {
		return Object.keys(this.menberDict);
	}

	/**
	 * 先頭のメンバーを取得
	 * @returns
	 */
	public getFirstMenber(): Actor {
		const character = this.getMenberList()[0];
		if (!character) throw new Error("指定されたキャラはパーティにいません");

		return character;
	}

	/**
	 * 指定されたメンバーのキャラ情報を取得
	 * @param partyId
	 */
	public getMenberInCharacterInfo(partyId: string): IStoreCharacter {
		const menber = this.getMenber(partyId);
		const character = GameManager.character.getCharacter(menber.characterId);
		return character;
	}
}
