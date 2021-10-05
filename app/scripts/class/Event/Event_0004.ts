import ResourceManager from "../manager/ResourceManager";
import SceneManager from "../manager/SceneManager";
import { Event_Base } from "./Event_Base";
import { ResourceName } from "../Scene/Scene_Lobby";
import LoadManager from "../manager/LoadManager";
import Scene_Lobby from "../Scene/Scene_Lobby";

/**
 * 0004: ロビー表示
 */
export class Event_0004 extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		const executed = await super.execute();
		if (!executed) return false;

		const BACKGROUND_IMAGE = "assets/images/background/title.jpg";
		const MESSAGE_BACKGROUND_IMAGHE = "assets/images/window/messages/red.png";

		await ResourceManager.loadResources([BACKGROUND_IMAGE, MESSAGE_BACKGROUND_IMAGHE]);

		await SceneManager.stopScene();

		await SceneManager.addScene(
			new Scene_Lobby({
				[ResourceName.BackgroundImage]: BACKGROUND_IMAGE,
				[ResourceName.MessageBackgroundImage]: MESSAGE_BACKGROUND_IMAGHE,
			})
		);

		await SceneManager.startScene();

		return LoadManager.complete(this.name);
	}
}
