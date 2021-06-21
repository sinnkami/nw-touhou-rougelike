import { DisplayObject } from "pixi.js";

export default class Sprite_Base {
	protected x: number;
	protected y: number;

	/**
	 * 横幅
	 */
	protected get width(): number {
		return 0;
	}

	/**
	 * 高さ
	 */
	protected get height(): number {
		return 0;
	}

	protected sprite: DisplayObject;

	public constructor(content: DisplayObject) {
		this.sprite = content;
		this.x = 0;
		this.y = 0;
	}

	public update(): Promise<any> {
		return Promise.resolve();
	}

	public getSprite(): DisplayObject {
		return this.sprite;
	}
}
