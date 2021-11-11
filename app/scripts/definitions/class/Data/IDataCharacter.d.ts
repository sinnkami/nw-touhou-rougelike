import { ICharacter } from "../../modules/field/ICharacter";

export interface IDataCharacter extends ICharacter {
	/** キャラID */
	characterId: string;
	/** フルネーム */
	fullName: string;

	// テクスチャ関連
	/** 歩行グラのパス */
	charaChipPath: string;
	/** 立ち絵のパス */
	portraitPath: string;
}
