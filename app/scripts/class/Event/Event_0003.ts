import ResourceManager from "../manager/ResourceManager";
import Scene_Title from "../Scene/Scene_Title";
import SceneManager from "../manager/SceneManager";
import { Event_Base } from "./Event_Base";
import { ResourceName } from "../Scene/Scene_Title";
import LoadManager from "../manager/LoadManager";

/**
 * 0003: タイトル表示
 */
export class Event_0003 extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		const executed = await super.execute();
		if (!executed) return false;

		const BACKGROUND_IMAGE = "assets/images/background/title.jpg";

		await ResourceManager.loadResources([BACKGROUND_IMAGE]);

		// MEMO: 最初以外に呼ぶことあると思うから条件分岐
		if (SceneManager.getScene()) {
			await SceneManager.stopScene();
		}

		await SceneManager.addScene(
			new Scene_Title({
				[ResourceName.BackgroundImage]: BACKGROUND_IMAGE,
			})
		);

		await SceneManager.startScene();

		return LoadManager.complete(this.name);
	}
}
