import { AbstractRenderer, Application, DisplayObject, Renderer } from "pixi.js";
import Const from "../../class/Const";

export default class Canvas {
	public app: Application;

	public constructor(width: number, height: number) {
		const app = new Application({
			width,
			height,
			backgroundColor: 0xffffff,
			// antialias: true,     // アンチエイリアスをONに
			// backgroundColor: "green", // 背景色
			//  transparent:      true,     // 背景を透過にしたい場合はこちらを指定
		});
		document.body.appendChild(app.view);
		this.app = app;
	}

	protected get width(): number {
		if (!this.app) return 0;
		return this.app.view.width;
	}

	protected get height(): number {
		if (!this.app) return 0;
		return this.app.view.height;
	}

	public getRenderer(): Renderer | AbstractRenderer {
		if (!this.app) throw new Error("not render");
		return this.app.renderer;
	}

	public addRender(render: DisplayObject): void {
		const stage = this.app.stage;
		stage.addChild(render);
	}

	public deleteRender(render: DisplayObject): void {
		const stage = this.app.stage;
		stage.removeChild(render);
	}

	public update(): void {
		return this.app.render();
	}
}
