import SceneManager from "../Manager/SceneManager";
import { Event_Base } from "./Event_Base";
import LoadManager from "../Manager/LoadManager";

/**
 * 0010: パーティ編集画面を閉じる
 */
export class Event_0010 extends Event_Base {
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
