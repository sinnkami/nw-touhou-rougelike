import { ISpritePartyPlaningPlaceMenuInfoOption } from "../../definitions/class/Sprite/ISpritePartyPlaningPlaceMenuInfo";
import Sprite_Base from "./Sprite_Base";
import Sprite_Character from "./Sprite_Character";
import { Sprite_Text } from "./Sprite_Text";

const SPRITE_NAME = "party_planing_place_menu_info";

/**
 * mask を再現するための描画クラス
 */
export default class Sprite_PartyPlaningPlaceMenuInfo extends Sprite_Base {
	private characterName: string = "";

	private level: number = 0;

	private charaChipPath: string = "";

	public init(option: ISpritePartyPlaningPlaceMenuInfoOption): void {
		if (option.name === undefined) option.name = SPRITE_NAME;

		super.init(option);
		this.characterName = option.characterName;
		this.level = option.level;
		this.charaChipPath = option.charaChipPath;
	}

	/**
	 * 描画するスプライトを設定
	 * @override
	 */
	public async setSprite(): Promise<void> {
		// コンテナを設定し、取得
		await super.setContainer();
		const container = super.getContainer();

		// コンテナの初期位置を設定
		container.setTransform(this.x, this.y);

		// 歩行グラ表示
		const CharaRender = new Sprite_Character();
		CharaRender.init({
			x: 0,
			y: 0,
			width: 60,
			height: this.height,
			path: this.charaChipPath,
		});
		await CharaRender.setSprite();
		container.addChild(CharaRender.getContainer());

		// キャラ名表示
		const CharacterNameRender = new Sprite_Text();
		CharacterNameRender.init({
			x: 60,
			y: 0,
			width: 100,
			height: 25,
			fontSize: 24,
			text: this.characterName,
		});
		await CharacterNameRender.setSprite();
		container.addChild(CharacterNameRender.getContainer());

		// レベル表示
		const LevelRender = new Sprite_Text();
		LevelRender.init({
			x: 60,
			y: 25,
			width: 100,
			height: 25,
			fontSize: 24,
			text: `Lv. ${this.level}`,
		});
		await LevelRender.setSprite();
		container.addChild(LevelRender.getContainer());
	}
}
