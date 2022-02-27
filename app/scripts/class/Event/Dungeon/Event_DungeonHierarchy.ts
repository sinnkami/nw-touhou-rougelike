import GameManager from "../../Manager/GameManager";
import LoadManager from "../../Manager/LoadManager";
import SceneManager from "../../Manager/SceneManager";
import { Event_Base } from "../Event_Base";

/**
 * ダンジョン内階段イベント
 */
export class Event_DungeonHierarchy extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		await this.startLoading();

		GameManager.map.initMapData();

		// 階層を増やす
		const hierarchy = GameManager.dungeon.getCurrentHierarchy();
		GameManager.dungeon.setCurrentHierarchy(hierarchy + 1);

		// ボス前階層かどうか
		if (GameManager.dungeon.isBeforeBossHierarchy) {
			console.info("ボス前階層到達");
			//TODO: ボスBGMへ変更
		}

		// ダンジョンの再生成
		GameManager.dungeon.createDungeon();

		// 再実行することでダンジョン階層を変更
		await SceneManager.startScene(true);

		return this.endLoading();
	}
}
