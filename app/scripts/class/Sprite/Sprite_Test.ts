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
		super();
		this.setName(`${this.constructor.name}`);
		this.setPosition(x, y);
	}

	public update(ctx: CanvasRenderingContext2D): Promise<void> {
		super.update(ctx);
		ctx.fillStyle = `rgb(${Math.floor(this.x % 255)}, ${Math.floor(this.y % 255)}, 0)`;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		return Promise.resolve();
	}

	public clear(ctx: CanvasRenderingContext2D) {
		super.clear(ctx);
		ctx.clearRect(this.x, this.y, this.width, this.height);
		return Promise.resolve();
	}
}
