import { Container, Sprite, Spritesheet } from "pixi.js";
import Sprite_Base from "./Sprite_Base";
import json from "../../../spritesheet/mapChip.json";
import GameManager from "../GameManager";
import ResourceManager from "../ResourceManager";
import Const, { KeyCode } from "../Const";

const SPRITE_NAME = "map";

export default class Sprite_Character extends Sprite_Base {
	public constructor(path: string, x: number, y: number) {
		const container = new Container();
		super(SPRITE_NAME, container);

		ResourceManager.getTexture(path).then(texture => {
			const sheet = new Spritesheet(texture, json);
			sheet.parse(() => {
				// TODO: ちゃんとキャラ画像へ
				const texture = sheet.textures["99"];
				const sprite = new Sprite(texture);
				sprite.setTransform(x * sprite.width, y * sprite.height);

				container.addChild(sprite);
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
