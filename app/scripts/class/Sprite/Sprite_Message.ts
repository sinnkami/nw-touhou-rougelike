import { Graphics, Text } from "pixi.js";
import { ISpriteMessageOption } from "../../definitions/class/Sprite/ISpriteMessage";

import Const from "../Const";
import GameManager from "../GameManager";
import Sprite_Base from "./Sprite_Base";

const SPRITE_NAME = "message";

/**
 * アニメーション付きテキストを表示する
 */
export class Sprite_Message extends Sprite_Base {
	// 表示中のテキスト番号
	private textIndex = 0;

	// テキスト中の改行数
	private newLineCount = 0;

	// 表示を行うテキスト情報
	private textList: string[][] = [];

	// 表示するテキスト
	protected readonly text: string;

	// 表示する際のフォントサイズ
	protected readonly fontSize: number;

	public constructor(option: ISpriteMessageOption) {
		if (option.name === undefined) option.name = SPRITE_NAME;
		if (option.delay === undefined) option.delay = 4;

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

		// テキスト情報を作成する
		// 1. まず表示できる文字数で切り出す
		const textListBySplitLength = this.text.match(
			new RegExp(`.{0,${Math.floor(this.width / this.fontSize)}}`, "g")
		);
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
		// 表示するテキストがなくなった場合、更新しない
		if (!this.textList[this.newLineCount]) return;

		super.update();

		if (!this.isAnimation) {
			// テキストが出ないようにする時間
			this.nextUpdateFrame = GameManager.loop.frameCount + this.delay;

			this.appendText();
		}
	}

	private appendText(): void {
		const container = super.getSprite();
		if (!container) return;

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
			fontSize: this.fontSize,
			fill: "#FFFFFF",
			align: "center",
		});
		text.x = this.fontSize * this.textIndex;
		text.y = this.fontSize * this.newLineCount;

		const size = text.width;

		text.width = 0;
		text.alpha = 0;

		// 縦軸のテキスト表示範囲を超えた場合は表示しない
		if (text.y >= this.height) {
			return;
		}

		// 横軸のテキスト表示範囲を超えた場合は、改行数を増やし、テキスト番号を初期化
		if (text.x >= this.width) {
			this.newLineCount++;
			this.textIndex = 0;
		} else {
			this.textIndex++;
		}

		this.setUpdateFunc((frame: number) => {
			// MEMO: ディレイ値が0の場合に割れなくなるのでその対応として Math.max 使用
			text.width += size / Math.max(this.delay, 1);
			text.alpha += 1 / Math.max(this.delay, 1);

			if (frame >= this.nextUpdateFrame) {
				return this.deleteUpdateFunc();
			}
		});

		container.addChild(text);
	}
}
