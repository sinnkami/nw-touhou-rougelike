import { IDataEnemy } from "../../definitions/class/Data/IDataEnemy";
import { IPartyMenber } from "../../definitions/modules/field/IPartyMenber";
import sleep from "../../modules/utils/sleep";
import waitInput from "../../modules/utils/waitInput";
import { BattleCommands, BattlePhase, CharacterType } from "../Construct/BattleConstruct";
import { CharacterStatus } from "../Construct/CharacterConstruct";
import { KeyCode } from "../Construct/CommonConstruct";
import { Material } from "../Construct/MaterialConstruct";
import DataManager from "../Manager/DataManager";
import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
import Store_Base from "../Store/Store_Base";
import { attack } from "../../modules/Battle_Commands/Attack";
import { Game_Base } from "./Game_Base";

export default class Game_Battle extends Game_Base {
	public async init(): Promise<void> {
		StoreManager.battle.init();
		StoreManager.battle.setHasExecutedPhase(true);
	}

	// バトルフェイズ
	public getPhase(): BattlePhase {
		return StoreManager.battle.getPhase();
	}

	public setPhase(phase: BattlePhase): void {
		return StoreManager.battle.setPhase(phase);
	}

	public changePhase(phase: BattlePhase): void {
		console.info("バトルフェイズ - ", phase);

		this.setHasExecutedPhase(false);
		this.setPhase(phase);
	}

	// そのフェイズを実行したか
	public getHasExecutedPhase(): boolean {
		return StoreManager.battle.getHasExecutedPhase();
	}

	public setHasExecutedPhase(hasExecutedPhase: boolean): void {
		return StoreManager.battle.setHasExecutedPhase(hasExecutedPhase);
	}

	// 実行するコマンド関数
	public getCommand(): () => Promise<void> {
		return StoreManager.battle.getCommand();
	}

	public setCommand(command?: () => Promise<void>): void {
		return StoreManager.battle.setCommand(command);
	}

	// 表示するバトルテキストリスト
	public getBattleLogList(): string[] {
		return StoreManager.battle.getBattleLogList();
	}

	public getCommandType(): BattleCommands | null {
		return StoreManager.battle.getCommandType();
	}

	public setCommandType(command: BattleCommands | null): void {
		StoreManager.battle.setCommandType(command);
	}

	public addBattleLog(log: string): void {
		StoreManager.battle.addBattleLog(log);
	}

	public clearBattleLogList(): void {
		StoreManager.battle.clearBattleLogList();
	}

	public getTarget(): IPartyMenber | null {
		const target = StoreManager.battle.getTarget();
		return target;
	}

	public setTarget(target: IPartyMenber | null): void {
		return StoreManager.battle.setTarget(target);
	}
}
