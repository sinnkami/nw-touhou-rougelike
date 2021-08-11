import { Container, Sprite, Spritesheet } from "pixi.js";
import Sprite_Base from "./Sprite_Base";
import json from "../../../spritesheet/mapChip.json";
import GameManager from "../GameManager";
import ResourceManager from "../ResourceManager";
import Const from "../Const";

const SPRITE_NAME = "map";

/**
 * マップの描画を行うクラス
 */
export default class Sprite_Map extends Sprite_Base {
	public constructor() {
		super(SPRITE_NAME);
	}

	/**
	 * 初期化処理
	 * @param path
	 * @param mapData
	 */
	public async init(path: string, x: number, y: number): Promise<void> {
		// コンテナを設定し、取得
		await super.init();
		const container = super.getSprite();
		if (!container) throw new Error("not container");

		// スプライトシートを取得し、設定
		const texture = await ResourceManager.getTexture(path);
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
		container.setTransform(x * 32, y * 32);
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
		const delay = 8;
		this.nextUpdateFrame = GameManager.loop.frameCount + delay;

		// 更新処理を設定
		this.setUpdateFunc((frame: number) => {
			if (frame > this.nextUpdateFrame) {
				return this.deleteUpdateFunc();
			}

			sprite.x -= x * (32 / delay);
			sprite.y -= y * (32 / delay);
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
