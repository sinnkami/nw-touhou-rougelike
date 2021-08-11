import { IRoomSize, ISize } from "../definitions/IConstruct";

/**
 * ゲーム内にて変更されることのない定義
 */
export default class Const {
	/** このゲームのFPS */
	public static readonly fps: number = 60;

	/** このゲームの解像度 */
	public static readonly size: ISize = {
		width: 832,
		height: 640,
	};

	/** マップの最大サイズ */
	public static readonly mapSize: ISize = {
		width: 100,
		height: 100,
	};

	/** マップの部屋サイズ */
	public static readonly roomSize: IRoomSize = {
		width: [5, 26],
		height: [5, 20],
	};

	/** マップを生成した際に確定で壁になる範囲 */
	// MEMO: これが無いとマップチップが存在しない範囲を描画することになる
	public static readonly wallZoneSize = 15;

	/** canvasを入れるdomのID */
	public static readonly baseDomId = "body";
}

// TODO: 以下enumを適切な場へ移動

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

// イベント名
export enum EventName {
	Stairs = "stairs",
}
