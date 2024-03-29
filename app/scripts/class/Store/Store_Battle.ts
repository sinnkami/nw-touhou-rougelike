import { IStoreCharacter } from "../../definitions/class/Store/IStoreCharacter";
import { IPartyMenber } from "../../definitions/modules/field/IPartyMenber";
import { BattleCommands, BattlePhase } from "../Construct/BattleConstruct";
import Store_Base from "./Store_Base";

/**
 * 現在戦闘中の情報を保持するクラス
 */
export default class Store_Battle extends Store_Base {
	// バトルフェイズ
	private phase: BattlePhase = BattlePhase.Init;
	// そのフェイズを実行したか
	private hasExecutedPhase: boolean = false;

	// 現在選択しているコマンド
	private commandType: BattleCommands | null = null;

	// 実行するコマンド関数
	private commandFunc?: () => Promise<void>;

	// 表示するバトルテキスト
	private battleLogList: string[] = [];

	// コマンド対象
	private target: IPartyMenber | null = null;

	public async init(): Promise<void> {
		this.phase = BattlePhase.Init;
		this.hasExecutedPhase = false;
		this.commandType = null;
		this.commandFunc = undefined;
		this.battleLogList.length = 0;
		this.target = null;
	}

	public getPhase(): BattlePhase {
		return this.phase;
	}

	public setPhase(phase: BattlePhase): void {
		this.phase = phase;
	}

	public getHasExecutedPhase(): boolean {
		return this.hasExecutedPhase;
	}

	public setHasExecutedPhase(hasExecutedPhase: boolean): void {
		this.hasExecutedPhase = hasExecutedPhase;
	}

	public getCommandType(): BattleCommands | null {
		return this.commandType;
	}

	public setCommandType(commandType: BattleCommands | null): void {
		this.commandType = commandType;
	}

	public getCommand(): () => Promise<void> {
		if (!this.commandFunc) throw new Error("実行するコマンドが設定されていない");
		return this.commandFunc;
	}

	public setCommand(command: (() => Promise<void>) | undefined): void {
		this.commandFunc = command;
	}

	public getBattleLogList(): string[] {
		return this.battleLogList;
	}

	public addBattleLog(log: string): void {
		this.battleLogList.push(log);
	}

	public clearBattleLogList(): void {
		this.battleLogList.length = 0;
	}

	public getTarget(): IPartyMenber | null {
		return this.target;
	}

	public setTarget(target: IPartyMenber | null): void {
		this.target = target;
	}
}
