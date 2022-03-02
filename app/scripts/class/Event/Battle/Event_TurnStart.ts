import SceneManager from "../../Manager/SceneManager";
import { Event_Base } from "../Event_Base";
import LoadManager from "../../Manager/LoadManager";
import GameManager from "../../Manager/GameManager";
import { BattlePhase, CharacterType } from "../../Construct/BattleConstruct";
import sleep from "../../../modules/utils/sleep";

/**
 * ターン開始処理
 */
export class Event_TurnStart extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		if (GameManager.battle.getHasExecutedPhase()) return Promise.resolve(false);
		GameManager.battle.setHasExecutedPhase(true);

		const turn = GameManager.turn.getCurrentTrun();
		console.info(`ターン開始 -> ${turn.character.name}(${turn.type})`);

		// バトルログをクリア
		GameManager.battle.clearBattleLogList();

		GameManager.battle.changePhase(BattlePhase.CommandSelect);

		return Promise.resolve(true);
	}
}
