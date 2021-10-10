import { Sprite } from "@pixi/sprite";
import { ISpritePortraitOption } from "../../definitions/class/Sprite/ISprutePortrait";
import { CommonConstruct } from "../Construct/CommonConstruct";
import ResourceManager from "../Manager/ResourceManager";
import Sprite_Base from "./Sprite_Base";

const SPRITE_NAME = "portrait";

/**
 * 立ち絵を描画するクラス
 */
export default class Sprite_Portrait extends Sprite_Base {
	// 立ち絵のパス
	protected path: string = "";

	public init(option: ISpritePortraitOption): void {
		if (option.name === undefined) option.name = SPRITE_NAME;

		super.init(option);
		this.path = option.path;
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

		const texture = await ResourceManager.getTexture(this.path);
		const sprite = new Sprite(texture);

		// 立ち絵のサイズによってサイズを指定
		this.width = texture.width / 2;
		this.height = CommonConstruct.size.height;

		console.log(this.width, this.height);

		sprite.width = this.width;
		sprite.height = this.height;

		container.addChild(sprite);
	}
}
