import { EventManager } from "../EventManager";
import GameManager from "../GameManager";
import LoadManager from "../LoadManager";
import Scene_Dungeon from "../Scene/Scene_Dungeon";
import SceneManager from "../SceneManager";
import Sprite_Base from "../Sprite/Sprite_Base";
import { Event_Base } from "./Event_Base";

/**
 * 0001: ダンジョン内階段イベント
 */
export class Event_0001 extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<void> {
		if (LoadManager.isLoading) {
			console.log("イベントスキップ");
			return;
		}

		await super.execute();

		await SceneManager.stopScene();
		GameManager.map.initMapData();

		// スプライトの削除
		const scene = SceneManager.getScene() as Scene_Dungeon;
		Object.values(scene.processInfo).forEach((info: { class: Sprite_Base | undefined }) => {
			if (info.class) {
				info.class.destroy();
			}
		});

		// 階層を増やす
		const hierarchy = GameManager.dungeon.getCurrentHierarchy();
		GameManager.dungeon.setCurrentHierarchy(hierarchy + 1);

		// 再実行することでダンジョン階層を変更
		await SceneManager.startScene();

		await LoadManager.complete("test");
	}
}
