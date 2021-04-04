import { IGameSize } from "../definitions/IConstruct";

export enum CanvasLayer {
	Background = "background",
}

export default class Const {
	/** このゲームのFPS */
	public static readonly fps: number = 60;
	/** このゲームの解像度 */
	public static readonly size: IGameSize = {
		width: 832,
		height: 640,
	}

	/** canvasを入れるdomのID */
	public static readonly baseDomId = "body";
}