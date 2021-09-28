import ResourceManager from "../manager/ResourceManager";
import Scene_Dungeon from "../Scene/Scene_Dungeon";
import SceneManager from "../manager/SceneManager";
import { Event_Base } from "./Event_Base";
import { ResourceName } from "../Scene/Scene_Dungeon";
import GameManager from "../manager/GameManager";
import LoadManager from "../manager/LoadManager";
import DataManager from "../manager/DataManager";

/**
 * 0002: ダンジョン突入イベント
 */
export class Event_0002 extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(dungeonId: string): Promise<boolean> {
		const executed = await super.execute();
		if (!executed) return false;

		// TODO: いずれ Data_Hoge から取得するように書き換える
		const dataDungeon = DataManager.dungeon.get(dungeonId);
		if (!dataDungeon) throw new Error(`no select dungeon on dungeonId: ${dungeonId}`);

		const MAP_PATH = "assets/images/map/chip.png";
		const CHARACTER_PATH = "assets/images/character/ReimuHakurei.png";

		GameManager.map.setName(dataDungeon.name);
		GameManager.dungeon.invadeDungeon();

		await ResourceManager.loadResources([MAP_PATH, CHARACTER_PATH]);

		await SceneManager.stopScene();

		await SceneManager.setScene(
			new Scene_Dungeon({
				[ResourceName.Map]: MAP_PATH,
				[ResourceName.Character]: CHARACTER_PATH,
			})
		);

		await SceneManager.startScene();

		return LoadManager.complete(this.name);
	}
}
