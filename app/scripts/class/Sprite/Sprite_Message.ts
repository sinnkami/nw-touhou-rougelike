import { Graphics, Text } from "pixi.js";
import { ISpriteMessageOption } from "../../definitions/class/Sprite/ISpriteMessage";

import GameManager from "../manager/GameManager";
import Sprite_Base from "./Sprite_Base";

const SPRITE_NAME = "message";

/**
 * アニメーション付きテキストを描画するクラス
 */
export class Sprite_Message extends Sprite_Base {
	// 表示中のテキスト番号
	private textIndex = 0;

	// テキスト中の改行数
	private newLineCount = 0;

	// 表示を行うテキスト情報
	private textList: string[][] = [];

	// 表示するテキスト
	protected text: string = "";

	// 表示する際のフォントサイズ
	protected fontSize: number = 0;

	public init(option: ISpriteMessageOption): void {
		if (option.name === undefined) option.name = SPRITE_NAME;
		if (option.delay === undefined) option.delay = 4;

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

		// コンテナの初期位置を設定
		container.setTransform(this.x, this.y);

		// TODO: 背景画像を仮の物ではなくちゃんとした物へ
		container.addChild(new Graphics().beginFill(0x008000).drawRect(this.x, this.y, this.width, this.height));

		// テキスト情報を作成する
		// まず表示できる文字数で切り出す
		const textListBySplitLength = this.text.match(
			new RegExp(`.{0,${Math.floor(this.width / this.fontSize)}}`, "g")
		);
		if (!textListBySplitLength) throw new Error("not text");
		console.log(textListBySplitLength);

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

	/**
	 * テキストを1文字ずつアニメーション付きで追加する
	 * @returns
	 */
	private appendText(): void {
		const container = super.getContainer();
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
		text.x = this.x + this.fontSize * this.textIndex;
		text.y = this.y + this.fontSize * this.newLineCount;

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
