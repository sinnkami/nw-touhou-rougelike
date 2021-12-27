/** 最大レベル */
export const MAX_LEVEL: number = 80;

/** 初期レベル */
export const INIT_LEVEL: number = 1;

/** パラメータを計算する方法 */
export enum CalcStatusType {
	/** 晩成型 */
	Late = "Late",
	/** 早熟型 */
	Early = "Early",
}

/** キャラクターパラメータ */
export enum CharacterStatus {
	/** 体力 */
	Hp = "Hp",
	/** 霊力 */
	Mp = "Mp",
	/** 攻撃力 */
	Attack = "Attack",
	/** 守備力 */
	Defense = "Defense",
	/** 魔力 */
	Magical = "Magical",
	/** 素早さ */
	Agility = "Agility",
	/** 器用さ */
	Dexterity = "Dexterity",
}
