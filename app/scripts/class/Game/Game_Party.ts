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
	 * @param order
	 * @returns
	 */
	public getMenber(order: number): IStoreParty {
		const menber = this.menberList.find(v => v.order === order);

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
		return this.getMenber(1);
	}

	/**
	 * 指定されたメンバーのキャラ情報を取得
	 * @param order
	 */
	public getMenberInCharacterInfo(order: number): IStoreCharacter {
		const menber = this.getMenber(order);
		const character = GameManager.character.getCharacter(menber.characterId);
		return character;
	}
}
