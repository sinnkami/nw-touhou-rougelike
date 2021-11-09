import { ICharacter } from "../../modules/field/ICharacter";

// TODO: 敵のタイプ欲しい
export interface IDataEnemy extends ICharacter {
	/** 敵ID */
	enemyId: string;

	// テクスチャ関連
	/** 立ち絵のパス */
	portraitPath: string;
}
