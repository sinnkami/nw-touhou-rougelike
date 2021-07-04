import { Container } from "pixi.js";

export default class Sprite_Base {
	public name: string;
	protected sprite: Container;

	public constructor(name: string, content: Container) {
		this.name = name;
		this.sprite = content;
	}

	protected get x(): number {
		return this.getSprite().x;
	}

	protected get y(): number {
		return this.getSprite().y;
	}

	/**
	 * 横幅
	 */
	protected get width(): number {
		return this.getSprite().width;
	}

	/**
	 * 高さ
	 */
	protected get height(): number {
		return this.getSprite().height;
	}

	public update(): Promise<any> {
		return Promise.resolve();
	}

	public destroy(): Promise<any> {
		const sprite = this.getSprite();
		sprite.destroy();

		return Promise.resolve();
	}

	public getSprite(): Container {
		return this.sprite;
	}
}
