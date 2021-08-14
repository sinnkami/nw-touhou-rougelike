import { Graphics, Text } from "pixi.js";
import { ISpriteTextOption } from "../../definitions/class/Sprite/ISpriteText";
import Const from "../Const";
import GameManager from "../GameManager";
import Sprite_Base from "./Sprite_Base";

export class Sprite_Text extends Sprite_Base {
	// 表示中のテキスト番号
	private textIndex = 0;

	// テキスト中の改行数
	private newLineCount = 0;

	// 表示を行うテキスト情報
	private textList: string[][] = [];

	// オプション
	private option?: ISpriteTextOption;

	/**
	 * 初期化処理
	 * @override
	 * @param text
	 * @param x
	 * @param y
	 */
	public async init(text: string, option: ISpriteTextOption): Promise<void> {
		// コンテナを設定し、取得
		await super.init();
		const container = super.getSprite();
		if (!container) throw new Error("not container");

		this.option = option;

		// コンテナの初期位置を設定
		container.setTransform(option.x, option.y);

		// TODO: 背景画像を仮の物ではなくちゃんとした物へ
		container.addChild(new Graphics().beginFill(0x008000).drawRect(0, 0, option.width, option.height));

		// テキスト情報を作成する
		// 1. まず表示できる文字数で切り出す
		const textListBySplitLength = text.match(new RegExp(`.{0,${Math.floor(option.width / option.fontSize)}}`, "g"));
		if (!textListBySplitLength) throw new Error("not text");

		textListBySplitLength.forEach(text => {
			if (text) this.textList.push(text.split(""));
		});

		// MEMO: テキストの場合、後から追加なので初期化処理では特に何もしない
	}

	/**
	 * スプライトの更新処理
	 * @override
	 */
	public update(): void {
		// アニメーション中は更新しない
		if (this.isAnimation) return;

		// 表示するテキストがなくなった場合、更新しない
		if (this.textList.length <= this.newLineCount) return;

		// テキストが出ないようにする時間
		const delay = 8;
		this.nextUpdateFrame = GameManager.loop.frameCount + delay;

		this.appendText();
	}

	private appendText(): void {
		const container = super.getSprite();
		if (!container) return;

		const option = this.option;
		if (!option) return;

		const fontSize = option.fontSize || 25;

		// 次に表示する行が無い場合は、処理しない
		if (!this.textList[this.newLineCount]) return;

		const value = this.textList[this.newLineCount][this.textIndex];

		// 文字が見つからなかった場合は、次の行を見に行く
		if (!value) {
			this.newLineCount++;
			this.textIndex = 0;
			return this.appendText();
		}

		const text = new Text(value, {
			fontSize,
			fill: "#FFFFFF",
		});
		text.x = fontSize * this.textIndex;
		text.y = fontSize * this.newLineCount;

		// 縦軸のテキスト表示範囲を超えた場合は表示しない
		if (text.y >= option.height) {
			return;
		}

		// 横軸のテキスト表示歯にを超えた場合は、改行数を増やし、テキスト番号を初期化
		if (text.x >= option.width) {
			this.newLineCount++;
			this.textIndex = 0;
		} else {
			this.textIndex++;
		}

		container.addChild(text);
	}
}
