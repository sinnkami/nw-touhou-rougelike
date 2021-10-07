import { Sprite } from "@pixi/sprite";
import { ISpriteFrameOption } from "../../definitions/class/Sprite/ISpruteFrame";
import ResourceManager from "../manager/ResourceManager";
import Sprite_Base from "./Sprite_Base";

const SPRITE_NAME = "frame";

export default class Sprite_Frame extends Sprite_Base {
	protected path: string = "";

	public init(option: ISpriteFrameOption): void {
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

		sprite.width = this.width;
		sprite.height = this.height;

		container.addChild(sprite);
	}
}
