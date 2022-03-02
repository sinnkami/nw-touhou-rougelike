import SceneManager from "../../Manager/SceneManager";
import { Event_Base } from "../Event_Base";
import LoadManager from "../../Manager/LoadManager";
import GameManager from "../../Manager/GameManager";
import { BattlePhase } from "../../Construct/BattleConstruct";

/**
 * コマンド終了処理
 */
export class Event_CommandEnd extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		if (GameManager.battle.getHasExecutedPhase()) return Promise.resolve(false);
		GameManager.battle.setHasExecutedPhase(true);

		// 行動順を再設定
		// TODO: コマンド内容に対応して行動順を設定できるようにする
		const turn = GameManager.turn.getCurrentTrun();
		turn.gauge = 1000;

		// 使用したコマンドを初期化
		GameManager.battle.setCommand(undefined);
		GameManager.battle.setCommandType(null);
		GameManager.battle.setTarget(null);

		GameManager.battle.changePhase(BattlePhase.TrunEnd);

		return Promise.resolve(true);
	}
}
