import { IDataEnemy } from "../../definitions/class/Data/IDataEnemy";
import { BattlePhase } from "../Construct/BattleConstruct";
import DataManager from "../Manager/DataManager";
import GameManager from "../Manager/GameManager";
import { Game_Base } from "./Game_Base";

export default class Game_Battle extends Game_Base {
	// バトルフェイズ
	private phase: BattlePhase = BattlePhase.Init;

	private selectedCommand: string = "";

	private commandFunc?: () => void = undefined;

	public getPhase(): BattlePhase {
		return this.phase;
	}

	public init(enemyGroupId: string): void {
		this.changePhase(BattlePhase.Init);

		GameManager.enemyParty.setEnemyParty(enemyGroupId);

		const playerIdList = GameManager.party.getMenberList().map(v => v.characterId);
		const enemyIdList = GameManager.enemyParty.getEnemyPartyList().map(v => v.enemyId);
		GameManager.turn.setCharacterList(playerIdList, enemyIdList);
	}

	public executeBattleStart(): void {
		console.log("executeBattleStart");
		this.changePhase(BattlePhase.BattleStart);
	}

	public executeSelectedTurn(): void {
		console.log("executeSelectedTurn");

		this.changePhase(BattlePhase.SelectedTrun);
		GameManager.turn.getNextTrun();
	}

	public executeTurnStart(): void {
		console.log("executeTurnStart");

		this.changePhase(BattlePhase.TrunStart);
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
	public executeCommandSelect(): void {
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
		this.phase = phase;
	}
}
