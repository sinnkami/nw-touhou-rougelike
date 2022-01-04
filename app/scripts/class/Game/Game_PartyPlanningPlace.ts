import { IStoreCharacter } from "../../definitions/class/Store/IStoreCharacter";
import DataManager from "../Manager/DataManager";
import StoreManager from "../Manager/StoreManager";
import { Game_Base } from "./Game_Base";

/**
 * MEMO: PartyPlanningPlace は ドラクエの酒場を英訳した物
 */
export default class Game_PartyPlanningPlace extends Game_Base {
	private get characterList(): IStoreCharacter[] {
		return StoreManager.character.getAll();
	}

	public getCharacter(storeId: string): IStoreCharacter {
		const character = this.characterList.find(v => v.storeId === storeId);
		if (!character) throw new Error("所持していないキャラクターです");
		return character;
	}

	public addCharacter(character: IStoreCharacter): void {
		StoreManager.character.add(character);
	}

	public removeCharacter(storeId: string): void {
		StoreManager.character.remove(storeId);
	}
}
