import { IDataCharacter } from "../../definitions/class/Data/IDataCharacter";
import DataManager from "../Manager/DataManager";
import { Game_Base } from "./Game_Base";
/**
 * ゲーム内に登場するキャラの現在情報を操作するクラス
 */
export default class Game_Character extends Game_Base {
	private get characterList(): IDataCharacter[] {
		return DataManager.character.getAll();
	}

	public getCharacter(characterId: string): IDataCharacter {
		const character = this.characterList.find(v => v.characterId === characterId);
		if (!character) throw new Error(`設定されていないキャラクターです (ID: ${characterId})`);
		return character;
	}

	public getCharacterList(): IDataCharacter[] {
		return this.characterList;
	}
}
