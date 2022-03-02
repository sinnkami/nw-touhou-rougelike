import SceneManager from "../../Manager/SceneManager";
import { Event_Base } from "../Event_Base";
import LoadManager from "../../Manager/LoadManager";
import GameManager from "../../Manager/GameManager";
import { BattlePhase } from "../../Construct/BattleConstruct";

/**
 * ターン終了処理
 */
export class Event_TurnEnd extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		if (GameManager.battle.getHasExecutedPhase()) return Promise.resolve(false);
		GameManager.battle.setHasExecutedPhase(true);

		// バトルログをクリア
		GameManager.battle.clearBattleLogList();

		// TODO: 戦闘継続判定
		const enemyList = GameManager.enemyParty.getEnemyPartyList().filter(v => !v.isDead);
		if (!enemyList.length) {
			GameManager.battle.changePhase(BattlePhase.BattleEnd);
			return Promise.resolve(true);
		}

		GameManager.battle.changePhase(BattlePhase.SelectedTrun);

		return Promise.resolve(true);
	}
}
