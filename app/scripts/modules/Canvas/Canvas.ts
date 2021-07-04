import Const from "../../class/Const";
import * as PIXI from "pixi.js";
import { AbstractRenderer, Renderer } from "pixi.js";

export default class Canvas {
	public app: PIXI.Application;

	public constructor(width: number, height: number) {
		const app = new PIXI.Application({
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

	public addRender(render: PIXI.DisplayObject, index?: number): void {
		const stage = this.app.stage;
		if (index) {
			stage.addChildAt(render, index);
		} else {
			stage.addChild(render);
		}
	}

	public deleteRender(index?: number): void {
		const stage = this.app.stage;
		if (!index) {
			index = stage.children.length - 1;
		}
		stage.removeChildAt(index);
	}

	public update(): Promise<any> {
		this.app.render();
		return Promise.resolve();
	}

	// public clear(): Promise<any> {
	// 	const ctx = this.ctx;
	// 	if (!ctx) {
	// 		throw new Error("not canvas setting");
	// 	}
	// 	return Promise.all(this.renderList.map((render) => render.clear(ctx)));
	// }

	// public clearAllRender(): void {
	// 	if (!this.ctx) return;
	// 	this.ctx.clearRect(0, 0, this.width, this.height);
	// }

	// public initRenderList(): void {
	// 	this.renderList = [];
	// 	this.clearAllRender();
	// }
}
