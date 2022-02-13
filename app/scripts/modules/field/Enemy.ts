import { IDataEnemy } from "../../definitions/class/Data/IDataEnemy";
import Character from "./Character";

export default class Enemy extends Character {
	public get enemyId(): string {
		return this.id;
	}

	public constructor(option: IDataEnemy) {
		if (!option.id) {
			option.id = option.enemyId;
		}
		super(option);

		// 素材関連
		this.flame = option.flame;
		this.water = option.water;
		this.grass = option.grass;
		this.thunder = option.thunder;
		this.light = option.light;
		this.darkness = option.darkness;
	}
}
