import Character from "./Character";

export default class Actor extends Character {
	public get characterId(): string {
		return this.id;
	}
	public set characterId(id: string) {
		this.id = id;
	}
}
