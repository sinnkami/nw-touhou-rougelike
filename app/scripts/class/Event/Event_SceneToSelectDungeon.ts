import ResourceManager from "../Manager/ResourceManager";
import SceneManager from "../Manager/SceneManager";
import { Event_Base } from "./Event_Base";
import LoadManager from "../Manager/LoadManager";
import Scene_Lobby from "../Scene/Scene_Lobby";
import Scene_SelectDungeon from "../Scene/Scene_SelectDungeon";

/**
 * 0013: ダンジョン選択画面表示
 */
export class Event_SceneToSelectDungeon extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		const executed = await super.execute();
		if (!executed) return false;

		await this.loadResources(
			{
				name: "title-background",
				path: "assets/images/background/title.jpg",
			},
			{
				name: "message-background",
				path: "assets/images/window/menu/test.png",
			},
			{
				name: "menu-background",
				path: "assets/images/window/menu/test.png",
			}
		);

		await SceneManager.stopScene();

		await SceneManager.addScene(new Scene_SelectDungeon());

		await SceneManager.startScene();

		return LoadManager.complete(this.name);
	}
}
