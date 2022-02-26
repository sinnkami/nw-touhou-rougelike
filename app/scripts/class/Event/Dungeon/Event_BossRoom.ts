import ResourceManager from "../../Manager/ResourceManager";
import SceneManager from "../../Manager/SceneManager";
import { Event_Base } from "../Event_Base";
import LoadManager from "../../Manager/LoadManager";
import Scene_Lobby from "../../Scene/Scene_Lobby";
import GameManager from "../../Manager/GameManager";
import Scene_Boss from "../../Scene/Scene_Boss";

/**
 * 0008: ボス戦前会話を実行
 */
export class Event_BossRoom extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		const executed = await super.execute();
		if (!executed) return false;

		const bossMessagesInfo = GameManager.boss.getBossMessages();

		await this.loadResources(
			{
				name: "boss-background",
				path: bossMessagesInfo.backgroundImagePath,
				// 既にボス戦用背景が設定されていたら上書きする
				isOverwrite: true,
			},
			{
				name: "message-background",
				path: "assets/images/window/messages/red.png",
			}
		);

		await SceneManager.stopScene();

		await SceneManager.addScene(new Scene_Boss());

		await SceneManager.startScene();

		return LoadManager.complete(this.name);
	}
}
