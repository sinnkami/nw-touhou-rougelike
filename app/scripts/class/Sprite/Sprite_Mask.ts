import { Graphics } from "@pixi/graphics";
import { Sprite } from "@pixi/sprite";
import { ISpriteMaskOption } from "../../definitions/class/Sprite/ISpriteMask";
import { CommonConstruct } from "../Construct/CommonConstruct";
import ResourceManager from "../Manager/ResourceManager";
import Sprite_Base from "./Sprite_Base";

const SPRITE_NAME = "mask";

/**
 * mask を再現するための描画クラス
 */
export default class Sprite_Mask extends Sprite_Base {
	public init(option: ISpriteMaskOption): void {
		if (option.name === undefined) option.name = SPRITE_NAME;

		super.init(option);
		this.width = CommonConstruct.size.width;
		this.height = CommonConstruct.size.height;
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
		const sprite = new Graphics();

		sprite.beginFill(0x000);
		sprite.drawRect(0, 0, this.width, this.height);
		sprite.endFill();
		sprite.alpha = 0.8;

		container.addChild(sprite);
	}
}
