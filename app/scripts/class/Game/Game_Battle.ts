import { IDataEnemy } from "../../definitions/class/Data/IDataEnemy";
import { BattlePhase } from "../Construct/BattleConstruct";
import DataManager from "../Manager/DataManager";
import GameManager from "../Manager/GameManager";
import { Game_Base } from "./Game_Base";

export default class Game_Battle extends Game_Base {
	// バトルフェイズ
	private phase: BattlePhase = BattlePhase.Init;
	// そのフェイズを実行したか
	private hasExecutedPhase: boolean = false;

	private selectedCommand: string = "";

	private commandFunc?: () => void = undefined;

	public getPhase(): BattlePhase {
		return this.phase;
	}

	public async init(enemyGroupId: string): Promise<void> {
		this.changePhase(BattlePhase.Init);
		this.hasExecutedPhase = true;

		GameManager.enemyParty.setEnemyParty(enemyGroupId);

		const playerIdList = GameManager.party.getMenberList().map(v => v.characterId);
		const enemyIdList = GameManager.enemyParty.getEnemyPartyList().map(v => v.enemyId);
		GameManager.turn.setCharacterList(playerIdList, enemyIdList);
	}

	public async executeBattleStart(): Promise<void> {
		if (this.hasExecutedPhase) return;
		console.log("executeBattleStart");
		this.changePhase(BattlePhase.BattleStart);
		this.hasExecutedPhase = true;
	}

	public async executeSelectedTurn(): Promise<void> {
		if (this.hasExecutedPhase) return;
		console.log("executeSelectedTurn");

		this.changePhase(BattlePhase.SelectedTrun);
		this.hasExecutedPhase = true;
		GameManager.turn.getNextTrun();
	}

	public async executeTurnStart(): Promise<void> {
		if (this.hasExecutedPhase) return;
		console.log("executeTurnStart");

		this.changePhase(BattlePhase.TrunStart);
		this.hasExecutedPhase = true;

		const turn = GameManager.turn.getCurrentTrunCharacter();
	}

	// 選択したコマンドを保持する
	public selectCommand(command: string): void {
		this.selectedCommand = command;
	}
	public getSelectedCommand(): string {
		return this.selectedCommand;
	}

	// TODO: コマンド内容
	public async executeCommandSelect(): Promise<void> {
		console.log("executeCommandSelect");
		switch (this.selectedCommand) {
			case "attack": {
				this.commandFunc = () => {
					return;
				};
			}
			default:
				throw new Error("選択されたコマンドが存在しない");
		}
	}

	public changePhase(phase: BattlePhase): void {
		console.info("バトルフェイズ - ", phase);
		console.trace();
		this.phase = phase;
		this.hasExecutedPhase = false;
	}
}
