import { Container, Sprite, Spritesheet } from "pixi.js";
import Sprite_Base from "./Sprite_Base";
import json from "../../../spritesheet/mapChip.json";
import GameManager from "../GameManager";
import ResourceManager from "../ResourceManager";
import { KeyCode } from "../Const";

const SPRITE_NAME = "map";

export default class Sprite_Character extends Sprite_Base {
	public constructor(path: string, x: number, y: number) {
		const container = new Container();
		super(SPRITE_NAME, container);
		console.log("aaa");

		ResourceManager.getTexture(path).then(texture => {
			const sheet = new Spritesheet(texture, json);
			sheet.parse(() => {
				// TODO: ちゃんとキャラ画像へ
				const texture = sheet.textures["99"];

				console.log(texture);

				const sprite = new Sprite(texture);
				console.log(sprite);
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
		this.move(x, y);
		return;
	}

	private move(x: number, y: number): void {
		const sprite = this.getSprite();
		sprite.x += x;
		sprite.y += y;
	}
}
