import { Container } from "pixi.js";

export default class Sprite_Base {
	public name = "";
	private sprite?: Container;

	protected setSprite(content: Container): void {
		this.sprite = content;
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

	public update(x: number, y: number): void {
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
}
