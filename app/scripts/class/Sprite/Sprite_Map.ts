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
	public async init(path: string, mapData: IGameMapData[]): Promise<void> {
		const container = new Container();
		this.name = SPRITE_NAME;
		this.setSprite(container);

		const texture = await ResourceManager.getTexture(path);
		const sheet = new Spritesheet(texture, json);

		await new Promise(resolve => sheet.parse(() => resolve(null)));

		mapData.forEach((mapData: IGameMapData) => {
			const texture = sheet.textures[mapData.chip.toString()];
			const sprite = new Sprite(texture);
			sprite.setTransform(mapData.x * sprite.width, mapData.y * sprite.height);

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
}
