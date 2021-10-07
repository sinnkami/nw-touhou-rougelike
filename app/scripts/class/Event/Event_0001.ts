import GameManager from "../manager/GameManager";
import LoadManager from "../manager/LoadManager";
import SceneManager from "../manager/SceneManager";
import { Event_Base } from "./Event_Base";

/**
 * 0001: ダンジョン内階段イベント
 */
export class Event_0001 extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		const executed = await super.execute();
		if (!executed) return false;

		GameManager.map.initMapData();

		// 階層を増やす
		const hierarchy = GameManager.dungeon.getCurrentHierarchy();
		GameManager.dungeon.setCurrentHierarchy(hierarchy + 1);

		// ダンジョンの再生成
		GameManager.dungeon.createDungeon();

		// 再実行することでダンジョン階層を変更
		await SceneManager.startScene(true);

		return LoadManager.complete(this.name);
	}
}
