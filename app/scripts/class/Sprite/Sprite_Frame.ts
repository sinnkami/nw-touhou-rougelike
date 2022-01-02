import { Sprite } from "@pixi/sprite";
import { ISpriteFrameOption } from "../../definitions/class/Sprite/ISpruteFrame";
import ResourceManager from "../Manager/ResourceManager";
import Sprite_Base from "./Sprite_Base";
import json from "../../../spritesheet/window_frame.json";
import { Spritesheet, TilingSprite } from "pixi.js";

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

		// スプライトシートを取得し、設定
		const texture = await ResourceManager.getTexture(this.path);
		const sheet = new Spritesheet(texture, json);
		this.setSheet(sheet);

		// スプライトシートを解析
		await new Promise(resolve => sheet.parse(() => resolve(null)));

		const upperLeft = new Sprite(sheet.textures["upper_left"]);
		upperLeft.setTransform(0, 0);

		const lowerLeft = new Sprite(sheet.textures["lower_left"]);
		lowerLeft.setTransform(0, this.height - 7);

		container.addChild(upperLeft, lowerLeft);

		const upperRight = new Sprite(sheet.textures["upper_right"]);
		upperRight.setTransform(this.width - 7, 0);

		const lowerRight = new Sprite(sheet.textures["lower_right"]);
		lowerRight.setTransform(this.width - 7, this.height - 7);

		container.addChild(upperRight, lowerRight);

		const left = new TilingSprite(sheet.textures["left"], 7, this.height - 7 * 2);
		left.setTransform(0, 7);

		const right = new TilingSprite(sheet.textures["right"], 7, this.height - 7 * 2);
		right.setTransform(this.width - 7, 7);

		const upper = new TilingSprite(sheet.textures["upper"], this.width - 7 * 2, 7);
		upper.setTransform(7, 0);

		const lower = new TilingSprite(sheet.textures["lower"], this.width - 7 * 2, 7);
		lower.setTransform(7, this.height - 7);

		const center = new TilingSprite(sheet.textures["center"], this.width - 7 * 2, this.height - 7 * 2);
		center.setTransform(7, 7);

		container.addChild(left, right, upper, lower, center);

		// container.addChild(sprite);
	}
}
