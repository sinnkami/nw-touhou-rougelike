import ResourceManager from "../ResourceManager";
import Scene_Dungeon from "../Scene/Scene_Dungeon";
import SceneManager from "../SceneManager";
import { Event_Base } from "./Event_Base";

/**
 * 0002: ダンジョン突入イベント
 */
export class Event_0001 extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public execute(): void {
		// TODO: いずれ Data_Hoge から取得するように書き換える
		const MAP_PATH = "assets/images/map/chip.png";
		const CHARACTER_PATH = "assets/images/character/ReimuHakurei.png";

		ResourceManager.loadResources([MAP_PATH, CHARACTER_PATH]).then(async () => {
			await SceneManager.setScene(
				new Scene_Dungeon({
					map: MAP_PATH,
					character: CHARACTER_PATH,
				})
			);
			SceneManager.startScene();
		});
	}
}
