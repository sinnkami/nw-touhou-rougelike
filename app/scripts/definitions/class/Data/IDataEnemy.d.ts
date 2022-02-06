import { ICharacter } from "../../modules/field/ICharacter";

// TODO: 敵のタイプ欲しい
export interface IDataEnemy extends ICharacter {
	/** 敵ID */
	enemyId: string;

	// 素材関連
	/** 合成用素材: 炎 */
	flame: number;
	/** 合成用素材: 水 */
	water: number;
	/** 合成用素材: 草 */
	grass: number;
	/** 合成用素材: 雷 */
	thunder: number;
	/** 合成用素材: 光 */
	light: number;
	/** 合成用素材: 闇 */
	darkness: number;

	// テクスチャ関連
	/** 立ち絵のパス */
	portraitPath: string;
}
