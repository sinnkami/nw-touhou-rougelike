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
	private get menberList(): Actor[] {
		return StoreManager.party.getAll();
	}

	/**
	 * 指定されたStoreIdを持つメンバーが存在するか
	 * @param storeId
	 * @returns
	 */
	public hasMenberByStoreId(storeId: string): boolean {
		return this.getMenberList().some(actor => actor.storeId === storeId);
	}

	public addMenberByStoreId(storeId: string): void {
		const storeCharacter = StoreManager.character.get(storeId);
		if (!storeCharacter) throw new Error("指定されたメンバーを所持していません");

		const actor = new Actor(storeCharacter);
		StoreManager.party.add(actor);
	}

	public removeMenberByStoreId(storeId: string): void {
		const menber = this.getMenberList().find(actor => actor.storeId === storeId);
		if (!menber) throw new Error("指定されたメンバーはいません");

		StoreManager.party.remove(menber);
	}

	/**
	 * 全メンバーの情報を取得
	 * @param order
	 * @returns
	 */
	public getMenberList(): Actor[] {
		return this.menberList;
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
}
