export default class Render {
	protected name: string = "";
	protected id: number = 0;
	protected x: number = 0;
	protected y: number = 0;

	protected image?: HTMLImageElement;

	protected get width(): number {
		if (!this.image) return 0;
		return this.image.width;
	}

	protected get height(): number {
		if (!this.image) return 0;
		return this.image.height;
	}

	public update(ctx: CanvasRenderingContext2D): Promise<any> {
		return Promise.resolve();
	}

	public clear(ctx: CanvasRenderingContext2D): Promise<any> {
		return Promise.resolve();
	}

	public setName(name: string): void {
		this.name = name;
	}

	public setId(id: number): void {
		this.id = id;
	}

	public setPosition(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}
}