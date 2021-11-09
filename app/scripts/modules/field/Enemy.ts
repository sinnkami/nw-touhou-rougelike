import Character from "./Character";

export default class Enemy extends Character {
	public get enemyId(): string {
		return this.id;
	}
	public set enemyId(id: string) {
		this.id = id;
	}
}
