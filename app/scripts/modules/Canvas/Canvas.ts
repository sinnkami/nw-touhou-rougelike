import Construct from "../../Construct";
import { IRenderOptions } from "../../definitions/modules/Canvas/IRenderOptions";
import Render from "./Render";

export default class Canvas {
	protected dom?: HTMLCanvasElement;
	protected ctx?: CanvasRenderingContext2D;

	protected renderList: Render[] = [];

	public constructor(width: number, height: number) {
		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		this.dom = canvas;

		const body = document.getElementById(Construct.BASE_DOM_ID);
		body?.append(canvas);

		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("new ctx error");
		this.ctx = ctx;
	}

	protected get width(): number {
		if (!this.dom) return 0;
		return this.dom.width;
	}

	protected get height(): number {
		if (!this.dom) return 0;
		return this.dom.height;
	}

	public addRender(render: Render, index?: number): void {
		if (!index) {
			this.renderList.push(render);
			return;
		}
		this.renderList.splice(index, 0, render);
	}

	public deleteRender(index?: number): void {
		if (!index) {
			index = this.renderList.length - 1;
		}
		this.renderList.splice(index, 1);
	}

	public update(): Promise<any> {
		const ctx = this.ctx;
		if (!ctx) {
			throw new Error("not canvas setting");
		}

		return Promise.all(this.renderList.map((render) => render.update(ctx)));
	}

	public clear(): Promise<any> {
		const ctx = this.ctx;
		if (!ctx) {
			throw new Error("not canvas setting");
		}
		return Promise.all(this.renderList.map((render) => render.clear(ctx)));
	}

	public clearAllRender(): void {
		if (!this.ctx) return;
		this.ctx.clearRect(0, 0, this.width, this.height);
	}
}