import { ISize } from "pixi.js";
import { IRoomSize } from "../../definitions/class/Construct/ICommonConstruct";

import path from "../../modules/path";

/** セーブデータ保存先ディレクトリ */
export const SAVE_DIR_NAME = "savedata";
export const DEFAULT_SAVE_FILE_NAME = "saveFile";
export const SAVE_FILE_EXTENSION = ".savefile";
// export const SAVE_DIR = path.join(path.dirname(process.execPath), "savedata");
export const SAVE_DIR = path.resolve(
	"F:\\sinnkami\\src\\github.com\\sinnkami\\nw-touhou-rougelike\\app",
	SAVE_DIR_NAME
);

/** スクリーンショットを保存する場所 */
export const SAVE_SCREEN_SHOT_DIR = "F:\\sinnkami\\Desktop";

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
		width: 50,
		height: 50,
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
	Space = " ",
	Escape = "Escape",
}

// マップチップ
export enum MapChip {
	Road = "road",
	Wall = "wall",
	Stairs = "stairs",
}
