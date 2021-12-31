import { CalcStatusType } from "../../../class/Construct/CharacterConstruct";

export interface ICharacter {
	id: string;
	/** 名前 */
	name: string;
	/** レベル */
	level: number;
	/** 経験値 */
	exp: number;

	/** 成長タイプ */
	growthType: CalcStatusType;

	// パラメータ関連
	// レベル1時点でのステータス
	initStatus: IStatus;
	// 最大レベル時点でのステータス
	maxStatus: IStatus;
}

export interface IStatus {
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
