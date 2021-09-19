import ResourceManager from "../ResourceManager";
import Scene_Title from "../Scene/Scene_Title";
import SceneManager from "../SceneManager";
import { Event_Base } from "./Event_Base";
import { ResourceName } from "../Scene/Scene_Title";
import GameManager from "../GameManager";
import { EventManager } from "../EventManager";
import LoadManager from "../LoadManager";
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

		return ResourceManager.loadResources([BACKGROUND_IMAGE])
			.then(() =>
				SceneManager.setScene(
					new Scene_Lobby({
						[ResourceName.BackgroundImage]: BACKGROUND_IMAGE,
					})
				)
			)
			.then(() => SceneManager.startScene())
			.then(() => LoadManager.complete(this.name));
	}
}
