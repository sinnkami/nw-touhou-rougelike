import { IStoreEnemy } from "../../definitions/class/Store/IStoreEnemyParty";
import Character from "./Character";

export default class Enemy extends Character {
	public get enemyId(): string {
		return this.id;
	}
	public set enemyId(id: string) {
		this.id = id;
	}
	public constructor(option: IStoreEnemy) {
		super(option);
		this.enemyId = option.enemyId;
	}
}
