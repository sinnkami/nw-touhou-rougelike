import { IStoreEnemy } from "../../definitions/class/Store/IStoreEnemyParty";
import Character from "./Character";

export default class Enemy extends Character {
	public get enemyId(): string {
		return this.id;
	}

	public constructor(option: IStoreEnemy) {
		if (!option.id) {
			option.id = option.enemyId;
		}
		super(option);
	}
}
