import { Container, Sprite, Spritesheet } from "pixi.js";
import Sprite_Base from "./Sprite_Base";
import json from "../../../spritesheet/mapChip.json";
import GameManager from "../GameManager";
import ResourceManager from "../ResourceManager";
import { KeyCode } from "../Const";

const SPRITE_NAME = "map";

export default class Sprite_Map extends Sprite_Base {
	public constructor(path: string, mapData: number[][]) {
		const container = new Container();
		super(SPRITE_NAME, container);

		ResourceManager.getTexture(path).then(texture => {
			const sheet = new Spritesheet(texture, json);
			sheet.parse(() => {
				mapData.forEach((xList: number[], y: number) => {
					xList.forEach((chip: number, x: number) => {
						const texture = sheet.textures[chip.toString()];
						const sprite = new Sprite(texture);
						sprite.setTransform(x * sprite.width, y * sprite.height);

						container.addChild(sprite);
					});
				});
			});
		});

		const canvas = GameManager.getCanvas();
		canvas.addRender(container);
	}

	/**
	 * @override
	 */
	public update(x: number, y: number): void {
		super.update(x, y);

		const speed = 32;
		this.move(x * speed, y * speed);

		return;
	}

	private move(x: number, y: number): void {
		const sprite = this.getSprite();
		sprite.x += x;
		sprite.y += y;
	}
}
