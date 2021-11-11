import { IStoreCharacter } from "../../definitions/class/Store/IStoreCharacter";
import Character from "./Character";

export default class Actor extends Character {
	public get characterId(): string {
		return this.id;
	}
	public set characterId(id: string) {
		this.id = id;
	}

	public constructor(option: IStoreCharacter) {
		super(option);
		this.characterId = option.characterId;
	}
}
