import { IGameSize } from "../definitions/IConstruct";

export default class Const {
	/** このゲームのFPS */
	public static readonly fps: number = 60;
	/** このゲームの解像度 */
	public static readonly size: IGameSize = {
		width: 832,
		height: 640,
	};

	/** canvasを入れるdomのID */
	public static readonly baseDomId = "body";
}

export enum KeyCode {
	UP = "ArrowUp",
	DOWN = "ArrowDown",
	LEFT = "ArrowLeft",
	RIGHT = "ArrowRight",
}

export enum Map {
	Road = 1,
	Wall = 0,
}
