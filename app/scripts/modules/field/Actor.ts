import { IStoreCharacter } from "../../definitions/class/Store/IStoreCharacter";
import Character from "./Character";

export default class Actor extends Character {
	public get characterId(): string {
		return this.id;
	}

	public constructor(option: IStoreCharacter) {
		// キャラクターIDが設定されない場合があるので設定
		if (!option.id) {
			option.id = option.characterId;
		}
		super(option);
	}
}
