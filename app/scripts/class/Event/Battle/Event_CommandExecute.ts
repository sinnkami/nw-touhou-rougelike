import SceneManager from "../../Manager/SceneManager";
import { Event_Base } from "../Event_Base";
import LoadManager from "../../Manager/LoadManager";
import GameManager from "../../Manager/GameManager";
import { BattlePhase } from "../../Construct/BattleConstruct";

/**
 * コマンド実行処理
 */
export class Event_CommandExecute extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		if (GameManager.battle.getHasExecutedPhase()) return Promise.resolve(false);
		GameManager.battle.setHasExecutedPhase(true);

		const command = GameManager.battle.getCommand();
		await command();

		GameManager.battle.changePhase(BattlePhase.CommandEnd);

		return Promise.resolve(true);
	}
}
