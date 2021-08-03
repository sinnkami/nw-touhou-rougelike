import { Container, Sprite, Spritesheet } from "pixi.js";
import Sprite_Base from "./Sprite_Base";
import json from "../../../spritesheet/mapChip.json";
import GameManager from "../GameManager";
import ResourceManager from "../ResourceManager";
import { KeyCode } from "../Const";
import { IGameMapData } from "../../definitions/class/Game/IGameMap";

const SPRITE_NAME = "map";

export default class Sprite_Map extends Sprite_Base {
	/**
	 * @param path
	 * @param mapData
	 */
	public async init(path: string): Promise<void> {
		const container = new Container();
		this.name = SPRITE_NAME;
		this.setSprite(container);

		const baseMapData = GameManager.map.getMapData();
		const eventMapData = GameManager.map.getEventMapData();

		const texture = await ResourceManager.getTexture(path);
		const sheet = new Spritesheet(texture, json);

		await new Promise(resolve => sheet.parse(() => resolve(null)));

		baseMapData.forEach((map) => {
			const texture = sheet.textures[map.chip.toString()];
			const sprite = new Sprite(texture);
			sprite.setTransform(map.x * sprite.width, map.y * sprite.height);

			container.addChild(sprite);
		});

		eventMapData.forEach((map) => {
			const texture = sheet.textures[map.chip.toString()];
			const sprite = new Sprite(texture);
			sprite.name = map.name;
			sprite.setTransform(map.x * sprite.width, map.y * sprite.height);

			container.addChild(sprite);
		});

		const canvas = GameManager.getCanvas();
		canvas.addRender(container);
	}

	/**
	 * @override
	 */
	public update(x: number, y: number): void {
		super.update(x, y);

		this.move(x, y);

		return;
	}

	public move(x: number, y: number): void {
		const sprite = this.getSprite();
		if (!sprite) throw new Error("no sprite");

		const speed = 32;

		sprite.x += x * speed;
		sprite.y += y * speed;
	}

	public getChildByName(name: string): Sprite {
		const sprite = this.getSprite();
		if (!sprite) throw new Error("no sprite");

		const childSprite = sprite.getChildByName(name);
		return childSprite as Sprite;
	}
}
