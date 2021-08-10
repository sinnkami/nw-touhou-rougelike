import { AnimatedSprite, Container, Sprite, Spritesheet } from "pixi.js";
import Sprite_Base from "./Sprite_Base";
import json from "../../../spritesheet/character.json";
import GameManager from "../GameManager";
import ResourceManager from "../ResourceManager";
import Const, { KeyCode } from "../Const";
import { IKeyInfo } from "../../definitions/class/Game/IGameInput";

const SPRITE_NAME = "character";

export enum CharacterAnimation {
	Up = "up",
	Down = "down",
	Right = "right",
	Left = "left",
}

export default class Sprite_Character extends Sprite_Base {
	private runingAnimation: CharacterAnimation = CharacterAnimation.Down;

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

		const sprite = new AnimatedSprite([sheet.textures["down_0"]]);
		sprite.animationSpeed = 0.25;

		container.x = x * 32;
		container.y = y * 32;

		container.addChild(sprite);
	}

	/**
	 * @override
	 */
	public update(): void {
		const keyInfo = {
			up: GameManager.input.getKey(KeyCode.Up),
			down: GameManager.input.getKey(KeyCode.Down),
			right: GameManager.input.getKey(KeyCode.Right),
			left: GameManager.input.getKey(KeyCode.Left),
		};

		const key = GameManager.input.getKeyOfLowestFrame(Object.values(keyInfo));

		this.animation(key);
		return;
	}

	public animation(key: IKeyInfo | undefined): void {
		const sprite = this.getSprite();
		if (!sprite) return;

		if (key) {
			sprite.play();
			switch (key.keyCode) {
				case KeyCode.Up:
					return this.setTextures(CharacterAnimation.Up);
				case KeyCode.Down:
					return this.setTextures(CharacterAnimation.Down);
				case KeyCode.Right:
					return this.setTextures(CharacterAnimation.Right);
				case KeyCode.Left:
					return this.setTextures(CharacterAnimation.Left);
			}
		} else {
			sprite.gotoAndStop(1);
		}

		return;
	}

	public stopAnimation(): void {
		const sprite = this.getSprite();
		if (!sprite) return;

		sprite.gotoAndStop(1);
		return;
	}

	public setTextures(animation: CharacterAnimation): void {
		const sheet = this.getSheet();
		if (!sheet) return;
		const sprite = this.getSprite();
		if (!sprite) return;

		if (this.sameAnimation(animation)) return;

		sprite.textures = sheet.animations[animation];
		this.runingAnimation = animation;
		return;
	}

	public move(x: number, y: number): void {
		const sprite = super.getSprite();
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

	public getSprite(): AnimatedSprite | undefined {
		const container = super.getSprite();
		if (!container) return;

		const sprite = container.getChildAt(0);
		if (!sprite) return;

		return sprite as AnimatedSprite;
	}

	private sameAnimation(animation: CharacterAnimation): boolean {
		return this.runingAnimation === animation;
	}
}
