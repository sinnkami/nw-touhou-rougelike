import ResourceManager from "../Manager/ResourceManager";
import Scene_Dungeon from "../Scene/Scene_Dungeon";
import SceneManager from "../Manager/SceneManager";
import { Event_Base } from "./Event_Base";
import { ResourceName } from "../Scene/Scene_Dungeon";
import GameManager from "../Manager/GameManager";
import LoadManager from "../Manager/LoadManager";
import DataManager from "../Manager/DataManager";
import sleep from "../../modules/utils/sleep";
import StoreManager from "../Manager/StoreManager";

/**
 * 0006: メニューを閉じる
 */
export class Event_0006 extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		const executed = await super.execute();
		if (!executed) return false;

		await SceneManager.stopScene();

		await SceneManager.startScene(true);

		return LoadManager.complete(this.name);
	}
}
