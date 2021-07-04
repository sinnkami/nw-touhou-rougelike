import { AbstractRenderer, Renderer } from "pixi.js";
import Canvas from "../modules/Canvas/Canvas";
import Const from "./Const";
import { Game_Loop } from "./Game/Game_Loop";
import { Game_Map } from "./Game/Game_Map";

export default class GameManager {
	private static canvas: Canvas;

	public static map: Game_Map = new Game_Map();
	public static loop: Game_Loop = new Game_Loop();

	public static init(): Promise<void> {
		return Promise.all([this.setCanvas()]).then();
	}

	public static getCanvas(): Canvas {
		return this.canvas;
	}

	public static getRenderer(): Renderer | AbstractRenderer {
		return this.canvas.getRenderer();
	}

	private static setCanvas(): Promise<void> {
		this.canvas = new Canvas(Const.size.width, Const.size.height);
		return Promise.resolve();
	}
}
