export interface IDataCharacter {
	/** キャラID */
	characterId: string;
	/** 名前 */
	name: string;
	/** フルネーム */
	fullName: string;

	// テクスチャ関連
	/** 歩行グラのパス */
	charaChipPath: string;
	/** 立ち絵のパス */
	portraitPath: string;

	// パラメータ関連
	/** 最大体力 */
	hp: number;
	/** 最大霊力 */
	mp: number;
	/** 最大攻撃力 */
	attack: number;
	/** 最大守備力 */
	defense: number;
	/** 最大魔力 */
	magical: number;
	/** 最大素早さ */
	agility: number;
	/** 最大器用さ */
	dexterity: number;
}
