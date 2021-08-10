import { Container, Spritesheet } from "pixi.js";
import GameManager from "../GameManager";

export default class Sprite_Base {
	public name = "";
	private sprite?: Container;
	private sheet?: Spritesheet;

	protected nextUpdateFrame = 0;

	protected updateFunc?: (frame: number) => void;

	protected setSprite(sprite: Container): void {
		this.sprite = sprite;
	}

	protected setSheet(sheet: Spritesheet): void {
		this.sheet = sheet;
	}

	public get isAnimation(): boolean {
		return GameManager.loop.frameCount <= this.nextUpdateFrame;
	}

	protected get x(): number {
		const sprite = this.getSprite();
		if (!sprite) return 0;

		return sprite.x;
	}

	protected get y(): number {
		const sprite = this.getSprite();
		if (!sprite) return 0;

		return sprite.y;
	}

	/**
	 * 横幅
	 */
	protected get width(): number {
		const sprite = this.getSprite();
		if (!sprite) return 0;

		return sprite.width;
	}

	/**
	 * 高さ
	 */
	protected get height(): number {
		const sprite = this.getSprite();
		if (!sprite) return 0;

		return sprite.height;
	}

	public update(): void {
		const func = this.getUpdateFunc();
		func(GameManager.loop.frameCount);
		return;
	}

	public destroy(): void {
		const sprite = this.getSprite();
		if (!sprite) return;

		sprite.destroy();

		return;
	}

	public clearPosition(): void {
		const sprite = this.getSprite();
		if (!sprite) return;

		sprite.x = 0;
		sprite.y = 0;
	}

	public getSprite(): Container | undefined {
		return this.sprite;
	}

	public getSheet(): Spritesheet | undefined {
		return this.sheet;
	}

	protected getUpdateFunc(): (frame: number) => void {
		let func = this.updateFunc;
		if (!func) {
			func = () => {
				return;
			};
		}
		return func;
	}

	protected setUpdateFunc(func: (frame: number) => void): void {
		this.updateFunc = func;
	}

	protected deleteUpdateFunc(): void {
		this.updateFunc = () => {
			return;
		};
	}
}
