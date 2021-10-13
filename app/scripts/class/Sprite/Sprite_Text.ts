import { Graphics, Sprite, Text } from "pixi.js";
import { ISpriteMessageOption } from "../../definitions/class/Sprite/ISpriteMessage";
import { ISpriteTextOption } from "../../definitions/class/Sprite/ISpriteText";
import ResourceManager from "../Manager/ResourceManager";
import Sprite_Base from "./Sprite_Base";
import Sprite_Frame from "./Sprite_Frame";

const SPRITE_NAME = "text";

/**
 * テキストを描画するクラス
 */
export class Sprite_Text extends Sprite_Base {
	// 表示するテキスト
	protected text: string = "";

	// 表示する際のフォントサイズ
	protected fontSize: number = 0;

	// 背景画像を表示するか
	protected isBackground: boolean = false;

	// 背景画像のパス
	protected backgroundImagePath: string = "";

	public init(option: ISpriteTextOption): void {
		if (option.name === undefined) option.name = SPRITE_NAME;

		super.init(option);
		this.text = option.text;
		this.fontSize = option.fontSize;

		this.isBackground = option.isBackground || false;
		if (this.isBackground) {
			this.backgroundImagePath = option.backgroundImagePath || "";
		}
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

		const text = new Text(this.text, {
			fontSize: this.fontSize,
			fill: "#FFFFFF",
			align: "left",
		});

		if (this.isBackground) {
			const spriteFrame = new Sprite_Frame();
			spriteFrame.init({
				x: 0,
				y: 0,
				width: this.width,
				height: this.height + this.fontSize,
				path: this.backgroundImagePath,
			});
			await spriteFrame.setSprite();

			const backgroundContainer = spriteFrame.getContainer();

			text.setTransform(backgroundContainer.width / 32, backgroundContainer.height / 4);

			container.addChild(backgroundContainer);
		}

		container.addChild(text);
	}
}
