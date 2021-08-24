import ResourceManager from "../ResourceManager";
import Scene_Dungeon from "../Scene/Scene_Dungeon";
import SceneManager from "../SceneManager";
import { Event_Base } from "./Event_Base";
import { ResourceName } from "../Scene/Scene_Dungeon";
import GameManager from "../GameManager";

/**
 * 0002: ダンジョン突入イベント
 */
export class Event_0002 extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<void> {
		// TODO: いずれ Data_Hoge から取得するように書き換える
		const MAP_PATH = "assets/images/map/chip.png";
		const CHARACTER_PATH = "assets/images/character/ReimuHakurei.png";

		// TODO: マップ情報から取得する
		GameManager.dungeon.invadeDungeon("テストダンジョン");

		return ResourceManager.loadResources([MAP_PATH, CHARACTER_PATH])
			.then(() =>
				SceneManager.setScene(
					new Scene_Dungeon({
						[ResourceName.Map]: MAP_PATH,
						[ResourceName.Character]: CHARACTER_PATH,
					})
				)
			)
			.then(() => SceneManager.startScene());
	}
}
