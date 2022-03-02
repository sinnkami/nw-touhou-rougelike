import SceneManager from "../../Manager/SceneManager";
import { Event_Base } from "../Event_Base";
import LoadManager from "../../Manager/LoadManager";
import GameManager from "../../Manager/GameManager";
import { BattlePhase } from "../../Construct/BattleConstruct";

/**
 * 戦闘開始前処理
 */
export class Event_BattleInit extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		// MEMO: シーン切り替え時に初期化処理は呼び出し済み
		GameManager.battle.changePhase(BattlePhase.BattleStart);

		return Promise.resolve(true);
	}
}
