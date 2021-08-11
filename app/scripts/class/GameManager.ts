import { AbstractRenderer, Renderer } from "pixi.js";
import Canvas from "../modules/Canvas/Canvas";
import Const from "./Const";
import Game_Input from "./Game/Game_Input";
import { Game_Loop } from "./Game/Game_Loop";
import { Game_Map } from "./Game/Game_Map";
import Game_Player from "./Game/Game_Player";

/**
 * ゲームに関わる情報を取得できるようにするマネージャークラス
 */
export default class GameManager {
	// pixi.jsラッパークラス
	private static canvas: Canvas;

	// 各ゲームクラス
	public static map: Game_Map = new Game_Map();
	public static loop: Game_Loop = new Game_Loop();
	public static input: Game_Input = new Game_Input();
	public static player: Game_Player = new Game_Player();

	/**
	 * 初期化処理
	 * @returns
	 */
	public static init(): Promise<void> {
		return Promise.all([this.setCanvas()]).then();
	}

	/**
	 * pixi.jsラッパークラスを取得
	 * @returns Canvas
	 */
	public static getCanvas(): Canvas {
		return this.canvas;
	}

	/**
	 * pixi.jsラッパークラスを設定
	 * @returns Promise<void>
	 */
	private static setCanvas(): Promise<void> {
		this.canvas = new Canvas(Const.size.width, Const.size.height);
		return Promise.resolve();
	}
}
