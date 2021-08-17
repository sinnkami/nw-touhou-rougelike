import GameManager from "../GameManager";
import Scene_Dungeon from "../Scene/Scene_Dungeon";
import SceneManager from "../SceneManager";
import { Event_Base } from "./Event_Base";

/**
 * 0001: ダンジョン内階段イベント
 */
export class Event_0001 extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public execute(): void {
		SceneManager.stopScene();
		GameManager.map.initMapData();

		// 再実行することでダンジョン階層を変更
		SceneManager.startScene();
	}
}
