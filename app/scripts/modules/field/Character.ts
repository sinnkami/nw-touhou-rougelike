import { ICharacter } from "../../definitions/modules/field/ICharacter";

// キャラ情報
export default class Character {
	public id: string;
	/** 名前 */
	public name: string;
	// パラメータ関連
	/** 体力 */
	public hp: number;
	/** 霊力 */
	public mp: number;
	/** 攻撃力 */
	public attack: number;
	/** 守備力 */
	public defense: number;
	/** 魔力 */
	public magical: number;
	/** 素早さ */
	public agility: number;
	/** 器用さ */
	public dexterity: number;

	public constructor(option: ICharacter) {
		this.id = option.id;
		this.name = option.name;
		this.hp = option.hp;
		this.mp = option.mp;
		this.attack = option.attack;
		this.defense = option.defense;
		this.magical = option.magical;
		this.agility = option.agility;
		this.dexterity = option.dexterity;
	}

	public get isDead(): boolean {
		return this.hp <= 0;
	}
}
