import ResourceManager from "../ResourceManager";
import Scene_Title from "../Scene/Scene_Title";
import SceneManager from "../SceneManager";
import { Event_Base } from "./Event_Base";
import { ResourceName } from "../Scene/Scene_Title";
import GameManager from "../GameManager";

/**
 * 0003: タイトル表示
 */
export class Event_0003 extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<void> {
		const BACKGROUND_IMAGE = "assets/images/background/title.jpg";

		return ResourceManager.loadResources([BACKGROUND_IMAGE])
			.then(() =>
				SceneManager.setScene(
					new Scene_Title({
						[ResourceName.BackgroundImage]: BACKGROUND_IMAGE,
					})
				)
			)
			.then(() => SceneManager.startScene());
	}
}
