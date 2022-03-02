import SceneManager from "../../Manager/SceneManager";
import { Event_Base } from "../Event_Base";
import LoadManager from "../../Manager/LoadManager";
import GameManager from "../../Manager/GameManager";
import { BattlePhase } from "../../Construct/BattleConstruct";
import sleep from "../../../modules/utils/sleep";

/**
 * 戦闘終了処理
 */
export class Event_BattleEnd extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		if (GameManager.battle.getHasExecutedPhase()) return Promise.resolve(false);
		GameManager.battle.setHasExecutedPhase(true);

		const enemyList = GameManager.enemyParty.getEnemyPartyList();
		const enemyPartyName = `${enemyList[0].name}${enemyList.length > 1 ? "達" : ""}を倒した！`;
		GameManager.battle.addBattleLog(enemyPartyName);
		await sleep(2000);

		GameManager.battle.changePhase(BattlePhase.BattleResult);

		return Promise.resolve(true);
	}
}
