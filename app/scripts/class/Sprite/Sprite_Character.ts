import { AnimatedSprite, Container, Sprite, Spritesheet } from "pixi.js";
import Sprite_Base from "./Sprite_Base";
import json from "../../../spritesheet/character.json";
import GameManager from "../GameManager";
import ResourceManager from "../ResourceManager";
import Const, { KeyCode } from "../Const";

const SPRITE_NAME = "character";

export enum CharacterAnimation {
	Up = "up",
	Down = "down",
	Right = "right",
	Left = "left",
}

export default class Sprite_Character extends Sprite_Base {
	private sheet?: Spritesheet;
	private runingAnimation: CharacterAnimation = CharacterAnimation.Down;

	public async init(path: string, x: number, y: number): Promise<void> {
		const container = new Container();
		this.name = SPRITE_NAME;
		this.setSprite(container);

		const texture = await ResourceManager.getTexture(path);
		const sheet = new Spritesheet(texture, json);

		this.sheet = sheet;

		await new Promise(resolve => sheet.parse(() => resolve(null)));

		const sprite = new AnimatedSprite([sheet.textures["down_0"]]);
		sprite.width = 32;
		sprite.height = 32;

		sprite.animationSpeed = 0.25;

		sprite.play();

		// sprite.setTransform(x * sprite.width, y * sprite.height);

		container.addChild(sprite);

		const canvas = GameManager.getCanvas();
		canvas.addRender(container);
	}

	/**
	 * @override
	 */
	public update(x: number, y: number): void {
		super.update(x, y);
		this.animation();
		return;
	}

	public animation(): void {
		const sheet = this.sheet;
		if (!sheet) return;

		const sprite = this.getSprite();
		if (!sprite) return;

		const GameInput = GameManager.input;

		const keyUp = GameInput.getKey(KeyCode.Up);
		const keyDown = GameInput.getKey(KeyCode.Down);
		const keyRight = GameInput.getKey(KeyCode.Right);
		const keyLeft = GameInput.getKey(KeyCode.Left);

		if (!(keyUp || keyDown || keyLeft || keyRight)) {
			sprite.gotoAndStop(1);
		} else {
			sprite.play();
		}

		if (keyUp && !this.sameAnimation(CharacterAnimation.Up)) {
			sprite.textures = sheet.animations[CharacterAnimation.Up];
			this.runingAnimation = CharacterAnimation.Up;
			return;
		}
		if (keyDown && !this.sameAnimation(CharacterAnimation.Down)) {
			sprite.textures = sheet.animations[CharacterAnimation.Down];
			this.runingAnimation = CharacterAnimation.Down;
			return;
		}
		if (keyRight && !this.sameAnimation(CharacterAnimation.Right)) {
			sprite.textures = sheet.animations[CharacterAnimation.Right];
			this.runingAnimation = CharacterAnimation.Right;
			return;
		}
		if (keyLeft && !this.sameAnimation(CharacterAnimation.Left)) {
			sprite.textures = sheet.animations[CharacterAnimation.Left];
			this.runingAnimation = CharacterAnimation.Left;
			return;
		}

		return;
	}

	public stopAnimation(): void {
		const sprite = this.getSprite();
		if (!sprite) return;

		sprite.gotoAndStop(1);
		return;
	}

	public move(x: number, y: number): void {
		const sprite = super.getSprite();
		if (!sprite) throw new Error("no sprite");

		const speed = 32;

		sprite.x += x * speed;
		sprite.y += y * speed;
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
