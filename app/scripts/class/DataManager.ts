import { AbstractRenderer, Renderer } from "pixi.js";
import Canvas from "../modules/Canvas/Canvas";
import { CommonConstruct } from "./Construct/CommonConstruct";
import Data_Dungeon from "./Data/Data_Dungeon";
import { Game_Dungeon } from "./Game/Game_Dungeon";
import Game_Input from "./Game/Game_Input";
import { Game_Loop } from "./Game/Game_Loop";
import { Game_Map } from "./Game/Game_Map";
import Game_Player from "./Game/Game_Player";

/**
 * DB情報を管理するクラス
 */
export default class DataManager {
	// 各クラス
	public static dungeon: Data_Dungeon = new Data_Dungeon();

	/**
	 * 初期化処理
	 * @returns
	 */
	public static init(): Promise<void> {
		return Promise.all([this.dungeon.load()]).then();
	}
}
