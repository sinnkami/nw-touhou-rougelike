import { Graphics, Text } from "pixi.js";
import { ISpriteMessageOption } from "../../definitions/class/Sprite/ISpriteMessage";
import Sprite_Base from "./Sprite_Base";

const SPRITE_NAME = "text";

/**
 * テキストを描画するクラス
 */
export class Sprite_Text extends Sprite_Base {
	// 表示するテキスト
	protected text: string = "";

	// 表示する際のフォントサイズ
	protected fontSize: number = 0;

	public init(option: ISpriteMessageOption): void {
		if (option.name === undefined) option.name = SPRITE_NAME;

		super.init(option);
		this.text = option.text;
		this.fontSize = option.fontSize;
	}

	/**
	 * 描画するスプライトを設定
	 * @override
	 */
	public async setSprite(): Promise<void> {
		// コンテナを設定し、取得
		await super.setContainer();
		const container = super.getContainer();
		if (!container) throw new Error("not container");

		// コンテナの初期位置を設定
		container.setTransform(this.x, this.y);

		// TODO: 背景画像を仮の物ではなくちゃんとした物へ
		container.addChild(new Graphics().beginFill(0x008000).drawRect(this.x, this.y, this.width, this.height));

		const text = new Text(this.text, {
			fontSize: this.fontSize,
			fill: "#FFFFFF",
			align: "left",
		});

		text.setTransform(this.x, this.y);

		container.addChild(text);

		// MEMO: テキストの場合、後から追加なので初期化処理では特に何もしない
	}

	/**
	 * スプライトの更新処理
	 * @override
	 */
	public update(): void {
		super.update();
		// MEMO: 特段処理する必要はなし
	}
}
