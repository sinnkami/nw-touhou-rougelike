import { IStoreCharacter } from "../../definitions/class/Store/IStoreCharacter";
import { IStoreParty } from "../../definitions/class/Store/IStoreParty";
import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
import { Game_Base } from "./Game_Base";

/**
 * 現在のパーティーメンバーに関する情報を操作するクラス
 */
export default class Game_Party extends Game_Base {
	private get menberList(): IStoreParty[] {
		return StoreManager.party.getAll();
	}

	/**
	 * 指定されたメンバーの情報を取得
	 * @param partyId
	 * @returns
	 */
	public getMenber(partyId: string): IStoreParty {
		const menber = this.menberList.find(v => v.partyId === partyId);

		if (!menber) throw new Error("指定された並び位置にメンバーはいません");

		return menber;
	}

	/**
	 * 全メンバーの情報を取得
	 * @param order
	 * @returns
	 */
	public getMenberList(): IStoreParty[] {
		return this.menberList;
	}

	/**
	 * 先頭のメンバーを取得
	 * @returns
	 */
	public getFirstMenber(): IStoreParty {
		// TODO: 先頭の番号、固定値か何かにしたい
		const character = this.menberList.find(v => v.order === 1);
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
