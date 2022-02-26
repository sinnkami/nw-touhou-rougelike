import ResourceManager from "../../Manager/ResourceManager";
import Scene_Title from "../../Scene/Scene_Title";
import SceneManager from "../../Manager/SceneManager";
import { Event_Base } from "../Event_Base";
import LoadManager from "../../Manager/LoadManager";

/**
 * 0003: タイトル表示
 */
export class Event_SceneToTitle extends Event_Base {
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
				name: "title-logo",
				path: "assets/images/title/logo.png",
			}
		);

		// MEMO: 最初以外に呼ぶことあると思うから条件分岐
		if (SceneManager.getScene()) {
			await SceneManager.stopScene();
		}

		await SceneManager.addScene(new Scene_Title());

		await SceneManager.startScene();

		return LoadManager.complete(this.name);
	}
}
