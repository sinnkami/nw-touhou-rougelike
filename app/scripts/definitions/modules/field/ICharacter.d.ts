export interface ICharacter {
	id: string;
	/** 名前 */
	name: string;

	// パラメータ関連
	/** 体力 */
	hp: number;
	/** 霊力 */
	mp: number;
	/** 攻撃力 */
	attack: number;
	/** 守備力 */
	defense: number;
	/** 魔力 */
	magical: number;
	/** 素早さ */
	agility: number;
	/** 器用さ */
	dexterity: number;
}
