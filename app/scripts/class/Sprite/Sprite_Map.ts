import { Container, Sprite, Spritesheet } from "pixi.js";
import Sprite_Base from "./Sprite_Base";
import json from "../../../spritesheet/mapChip.json";
import GameManager from "../GameManager";
import ResourceManager from "../ResourceManager";
import Const from "../Const";

const SPRITE_NAME = "map";

export default class Sprite_Map extends Sprite_Base {
	/**
	 * @param path
	 * @param mapData
	 */
	public async init(path: string, x: number, y: number): Promise<void> {
		this.name = SPRITE_NAME;

		const container = new Container();
		this.setSprite(container);

		const canvas = GameManager.getCanvas();
		canvas.addRender(container);

		const texture = await ResourceManager.getTexture(path);
		const sheet = new Spritesheet(texture, json);
		this.setSheet(sheet);

		await new Promise(resolve => sheet.parse(() => resolve(null)));

		const baseMapData = GameManager.map.getMapData();
		baseMapData.forEach(map => {
			const texture = sheet.textures[map.chip.toString()];
			const sprite = new Sprite(texture);
			sprite.setTransform(map.x * sprite.width, map.y * sprite.height);

			container.addChild(sprite);
		});

		const eventMapData = GameManager.map.getEventMapData();
		eventMapData.forEach(map => {
			const texture = sheet.textures[map.chip.toString()];
			const sprite = new Sprite(texture);
			sprite.name = map.name;
			sprite.setTransform(map.x * sprite.width, map.y * sprite.height);

			container.addChild(sprite);
		});

		container.x = x * 32;
		container.y = y * 32;
	}

	/**
	 * @override
	 */
	public update(): void {
		super.update();
		return;
	}

	public move(x: number, y: number): void {
		const sprite = this.getSprite();
		if (!sprite) throw new Error("no sprite");

		const delay = 8;
		this.nextUpdateFrame = GameManager.loop.frameCount + delay;

		this.setUpdateFunc((frame: number) => {
			if (frame > this.nextUpdateFrame) {
				return this.deleteUpdateFunc();
			}

			sprite.x -= x * (32 / delay);
			sprite.y -= y * (32 / delay);
		});
	}

	public getChildByName(name: string): Sprite {
		const sprite = this.getSprite();
		if (!sprite) throw new Error("no sprite");

		const childSprite = sprite.getChildByName(name);
		return childSprite as Sprite;
	}
}
