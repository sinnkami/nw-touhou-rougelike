import SceneManager from "../../Manager/SceneManager";
import { Event_Base } from "../Event_Base";
import LoadManager from "../../Manager/LoadManager";
import GameManager from "../../Manager/GameManager";
import { BattleCommands, BattlePhase, CharacterType } from "../../Construct/BattleConstruct";
import getRandomValue from "../../../modules/utils/getRandomValue";
import { attack } from "../../../modules/Battle_Commands/Attack";

/**
 * コマンド選択処理
 */
export class Event_CommandSelect extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		if (GameManager.battle.getHasExecutedPhase()) return Promise.resolve(false);

		// MEMO: プレイヤー側コマンド選択は対象選択時に実行
		const currentTurn = GameManager.turn.getCurrentTrun();

		// 相手ターンの場合
		if (currentTurn.type === CharacterType.Enemy) {
			const menberList = GameManager.party.getMenberList();

			// TODO: とりあえず通常攻撃をさせる
			GameManager.battle.setCommandType(BattleCommands.Attack);
			GameManager.battle.setTarget(getRandomValue(menberList));
		}

		const source = currentTurn.character;
		const target = GameManager.battle.getTarget();
		const commandType = GameManager.battle.getCommandType();

		if (!target || !commandType) return Promise.resolve(false);
		GameManager.battle.setHasExecutedPhase(true);

		switch (commandType) {
			case BattleCommands.Attack: {
				// 通常攻撃コマンドを設定
				const command = () => attack(source, target);
				GameManager.battle.setCommand(command);
			}
		}

		// フェイズをコマンド実行へ移行
		GameManager.battle.changePhase(BattlePhase.CommandExecute);

		return Promise.resolve(true);
	}
}
