import ResourceManager from "../manager/ResourceManager";
import Scene_Dungeon from "../Scene/Scene_Dungeon";
import SceneManager from "../manager/SceneManager";
import { Event_Base } from "./Event_Base";
import { ResourceName } from "../Scene/Scene_Dungeon";
import GameManager from "../manager/GameManager";
import LoadManager from "../manager/LoadManager";

/**
 * 0002: ダンジョン突入イベント
 */
export class Event_0002 extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		const executed = await super.execute();
		if (!executed) return false;

		// TODO: いずれ Data_Hoge から取得するように書き換える
		const MAP_PATH = "assets/images/map/chip.png";
		const CHARACTER_PATH = "assets/images/character/ReimuHakurei.png";

		// TODO: マップ情報から取得する
		GameManager.map.setName("テストダンジョン");
		GameManager.dungeon.invadeDungeon();

		return ResourceManager.loadResources([MAP_PATH, CHARACTER_PATH])
			.then(() =>
				SceneManager.setScene(
					new Scene_Dungeon({
						[ResourceName.Map]: MAP_PATH,
						[ResourceName.Character]: CHARACTER_PATH,
					})
				)
			)
			.then(() => SceneManager.startScene())
			.then(() => LoadManager.complete(this.name));
	}
}
