import { IDataEnemy } from "../../definitions/class/Data/IDataEnemy";
import Character from "./Character";

export default class Enemy extends Character {
	/** 合成用素材: 炎 */
	public flame: number = 0;
	/** 合成用素材: 水 */
	public water: number = 0;
	/** 合成用素材: 草 */
	public grass: number = 0;
	/** 合成用素材: 雷 */
	public thunder: number = 0;
	/** 合成用素材: 光 */
	public light: number = 0;
	/** 合成用素材: 闇 */
	public darkness: number = 0;

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
