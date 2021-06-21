import { Graphics, utils } from "pixi.js";
import Sprite_Base from "./Sprite_Base";

export default class Sprite_Test extends Sprite_Base {
	/**
	 * 横幅
	 * @override
	 */
	protected get width(): number {
		return 32;
	}

	/**
	 * 高さ
	 * @override
	 */
	protected get height(): number {
		return 32;
	}

	public constructor(x: number, y: number) {
		super(new Graphics());
		this.x = x;
		this.y = y;
	}

	/**
	 * @override
	 */
	public update(): Promise<void> {
		const sprite = this.getSprite();
		const color = utils.rgb2hex([
			Math.floor(this.x % (255 * Math.random())),
			Math.floor(this.y % (255 * Math.random())),
			0,
		]);
		sprite.beginFill(color);
		sprite.drawRect(this.x, this.y, 32, 32);
		return Promise.resolve();
	}

	/**
	 * @override
	 */
	public getSprite(): Graphics {
		return super.getSprite() as Graphics;
	}
}
