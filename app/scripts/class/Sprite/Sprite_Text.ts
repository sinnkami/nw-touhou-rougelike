import { Graphics, Text } from "pixi.js";
import { ISpriteMessageOption } from "../../definitions/class/Sprite/ISpriteMessage";
import GameManager from "../GameManager";
import Sprite_Base from "./Sprite_Base";

const SPRITE_NAME = "text";

/**
 * テキストを描画するクラス
 */
export class Sprite_Text extends Sprite_Base {
	// 表示するテキスト
	protected readonly text: string;

	// 表示する際のフォントサイズ
	protected readonly fontSize: number;

	public constructor(option: ISpriteMessageOption) {
		if (option.name === undefined) option.name = SPRITE_NAME;

		super(option);
		this.text = option.text;
		this.fontSize = option.fontSize;
	}

	/**
	 * 初期化処理
	 * @override
	 */
	public async init(): Promise<void> {
		// コンテナを設定し、取得
		await super.init();
		const container = super.getSprite();
		if (!container) throw new Error("not container");

		// コンテナの初期位置を設定
		container.setTransform(this.x, this.y);

		// TODO: 背景画像を仮の物ではなくちゃんとした物へ
		container.addChild(new Graphics().beginFill(0x008000).drawRect(0, 0, this.width, this.height));

		// まず表示できる文字数で切り出す
		const textListBySplitLength = this.text.match(
			new RegExp(`.{0,${Math.floor(this.width / this.fontSize)}}`, "g")
		);
		if (!textListBySplitLength) throw new Error("not text");

		const value = textListBySplitLength.filter(v => v.length).reduce((a, b) => a + "\n" + b, "");

		const text = new Text(value, {
			fontSize: this.fontSize,
			fill: "#FFFFFF",
			align: "left",
		});

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
