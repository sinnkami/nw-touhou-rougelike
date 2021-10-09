import { ICharacterPosition } from "../../definitions/class/Game/IGameCharacter";
import { IStoreCharacter } from "../../definitions/class/Store/IStoreCharacter";
import { MapChip } from "../Construct/CommonConstruct";
import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
import { Game_Base } from "./Game_Base";
/**
 * ゲーム内に登場するキャラの現在情報を操作するクラス
 */
export default class Game_Character extends Game_Base {
	private get characterList(): IStoreCharacter[] {
		return StoreManager.character.getAll();
	}

	public getCharacter(characterId: string): IStoreCharacter {
		const character = this.characterList.find(v => v.characterId === characterId);
		if (!character) throw new Error("所持していないキャラクターです");
		return character;
	}
}
