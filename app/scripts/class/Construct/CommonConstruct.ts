import { ISize } from "pixi.js";
import { IRoomSize } from "../../definitions/class/Construct/ICommonConstruct";

/**
 * ゲーム内にて変更されることのない定義
 */
export class CommonConstruct {
	/** このゲームのFPS */
	public static readonly fps: number = 60;

	/** このゲームの解像度 */
	public static readonly size: ISize = {
		width: 832,
		height: 640,
	};

	/** マップの最大サイズ */
	// TODO: 場所によって変えれるようにする
	public static readonly mapSize: ISize = {
		width: 100,
		height: 100,
	};

	/** マップの部屋サイズ */
	// TODO: 場所によって変えれるようにする
	public static readonly roomSize: IRoomSize = {
		width: [5, 26],
		height: [5, 20],
	};

	/** マップを生成した際に確定で壁になる範囲 */
	// MEMO: これが無いとマップチップが存在しない範囲を描画することになる
	public static readonly wallZoneSize: number = 15;

	/** canvasを入れるdomのID */
	public static readonly baseDomId: string = "body";
}

// キーコード
export enum KeyCode {
	Up = "ArrowUp",
	Down = "ArrowDown",
	Left = "ArrowLeft",
	Right = "ArrowRight",
	Select = "Enter",
}

// マップチップ
export enum MapChip {
	Road = "road",
	Wall = "wall",
	Stairs = "stairs",
}
