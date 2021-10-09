/**
 * ゲーム内キャラ情報
 * MEMO: Data_Characterが保持しているで変更されないならば極力保存しない
 */
export interface IStoreCharacter {
	/** キャラID */
	characterId: string;

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
