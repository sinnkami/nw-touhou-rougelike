import SceneManager from "../../Manager/SceneManager";
import { Event_Base } from "../Event_Base";
import LoadManager from "../../Manager/LoadManager";
import GameManager from "../../Manager/GameManager";
import { BattlePhase } from "../../Construct/BattleConstruct";
import sleep from "../../../modules/utils/sleep";

/**
 * ターン選択処理
 */
export class Event_SelectedTrun extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		if (GameManager.battle.getHasExecutedPhase()) return Promise.resolve(false);
		GameManager.battle.setHasExecutedPhase(true);

		const turn = (): void => {
			try {
				GameManager.turn.getCurrentTrun();
			} catch {
				GameManager.turn.getTurnList().forEach(v => (v.gauge -= v.character.agility));
				return turn();
			}
			return;
		};
		turn();

		GameManager.battle.changePhase(BattlePhase.TrunStart);
		return Promise.resolve(true);
	}
}
