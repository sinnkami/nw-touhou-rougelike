import { Container, Sprite, Spritesheet } from "pixi.js";
import Sprite_Base from "./Sprite_Base";
import json from "../../../spritesheet/mapChip.json";
import GameManager from "../GameManager";
import ResourceManager from "../ResourceManager";
import { ISpriteMapOption } from "../../definitions/class/Sprite/ISpriteMap";

const SPRITE_NAME = "map";

/**
 * マップの描画を行うクラス
 */
export default class Sprite_Map extends Sprite_Base {
	protected readonly path: string;

	public constructor(option: ISpriteMapOption) {
		if (option.delay === undefined) option.delay = 8;

		super(option);
		this.path = option.path;
	}

	/**
	 * 初期化処理
	 */
	public async init(): Promise<void> {
		// コンテナを設定し、取得
		await super.init();
		const container = super.getSprite();
		if (!container) throw new Error("not container");

		// スプライトシートを取得し、設定
		const texture = await ResourceManager.getTexture(this.path);
		const sheet = new Spritesheet(texture, json);
		this.setSheet(sheet);

		// スプライトシートを解析
		await new Promise(resolve => sheet.parse(() => resolve(null)));

		// 全マップチップをコンテナへ追加
		const baseMapData = GameManager.map.getMapData();
		baseMapData.forEach(map => {
			const texture = sheet.textures[map.chip.toString()];
			const sprite = new Sprite(texture);
			sprite.setTransform(map.x * sprite.width, map.y * sprite.height);

			container.addChild(sprite);
		});

		// マップチップの上から全イベントタイルをコンテナへ追加
		const eventMapData = GameManager.map.getEventMapData();
		eventMapData.forEach(map => {
			const texture = sheet.textures[map.chip.toString()];
			const sprite = new Sprite(texture);

			// スプライトの名前を設定
			sprite.name = map.name;
			sprite.setTransform(map.x * sprite.width, map.y * sprite.height);

			container.addChild(sprite);
		});

		// マップの初期位置を設定
		container.setTransform(this.x * 32, this.y * 32);
	}

	/**
	 * スプライトの更新処理
	 * @override
	 */
	public update(): void {
		super.update();
		// MEMO: 特段処理する必要はなし
		return;
	}

	/**
	 * スプライトを移動
	 * @param x
	 * @param y
	 */
	public move(x: number, y: number): void {
		const sprite = this.getSprite();
		if (!sprite) throw new Error("no sprite");

		// 移動出来ないようにする時間
		this.nextUpdateFrame = GameManager.loop.frameCount + this.delay;

		// 更新処理を設定
		this.setUpdateFunc((frame: number) => {
			sprite.x -= x * (32 / this.delay);
			sprite.y -= y * (32 / this.delay);

			if (frame >= this.nextUpdateFrame) {
				return this.deleteUpdateFunc();
			}
		});
	}

	/**
	 * 指定された名前のスプライトを取得
	 * @param name
	 * @returns
	 */
	public getChildByName(name: string): Sprite {
		const sprite = this.getSprite();
		if (!sprite) throw new Error("no sprite");

		const childSprite = sprite.getChildByName(name);
		return childSprite as Sprite;
	}
}
