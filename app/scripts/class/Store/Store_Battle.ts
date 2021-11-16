import { IStoreCharacter } from "../../definitions/class/Store/IStoreCharacter";
import { BattlePhase } from "../Construct/BattleConstruct";
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
	private commandType: string = "";

	// 実行するコマンド関数
	private commandFunc?: () => Promise<void> = undefined;

	public async init(): Promise<void> {
		this.phase = BattlePhase.Init;
		this.hasExecutedPhase = false;
		this.commandType = "";
		this.commandFunc = undefined;
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

	public getCommandType(): string {
		return this.commandType;
	}

	public setCommandType(commandType: string): void {
		this.commandType = commandType;
	}

	public getCommand(): () => Promise<void> {
		if (!this.commandFunc) throw new Error("実行するコマンドが設定されていない");
		return this.commandFunc;
	}

	public setCommand(command: (() => Promise<void>) | undefined): void {
		this.commandFunc = command;
	}
}
