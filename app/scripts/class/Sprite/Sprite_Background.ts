import { Sprite } from "pixi.js";
import { ISpriteBackgroundOption } from "../../definitions/class/Sprite/ISpriteBackGround";
import ResourceManager from "../manager/ResourceManager";
import Sprite_Base from "./Sprite_Base";

const SPRITE_NAME = "background";

/**
 * 背景画像を描画するクラス
 */
export class Sprite_Background extends Sprite_Base {
	// 読み込むファイルパス
	protected path: string = "";

	public init(option: ISpriteBackgroundOption): void {
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
		const backgroundImage = new Sprite(texture);

		backgroundImage.setTransform(this.x, this.y);
		backgroundImage.width = this.width;
		backgroundImage.height = this.height;

		container.addChild(backgroundImage);
	}
}
