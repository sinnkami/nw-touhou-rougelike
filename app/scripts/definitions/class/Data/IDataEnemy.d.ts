// TODO: キャラクターと共通化したい
export interface IDataEnemy {
	/** 敵ID */
	enemyId: string;
	/** 名前 */
	name: string;

	// テクスチャ関連
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
