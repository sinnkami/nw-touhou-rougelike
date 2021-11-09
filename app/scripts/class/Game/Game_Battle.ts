import { IDataEnemy } from "../../definitions/class/Data/IDataEnemy";
import { IPartyMenber } from "../../definitions/modules/field/IPartyMenber";
import { BattlePhase, CharacterType } from "../Construct/BattleConstruct";
import DataManager from "../Manager/DataManager";
import GameManager from "../Manager/GameManager";
import { attack } from "./Battle_Commands/Attack";
import { Game_Base } from "./Game_Base";

export default class Game_Battle extends Game_Base {
	// バトルフェイズ
	private phase: BattlePhase = BattlePhase.Init;
	// そのフェイズを実行したか
	private hasExecutedPhase: boolean = false;

	private selectedCommand: string = "";

	private commandFunc?: () => Promise<void> = undefined;

	public getPhase(): BattlePhase {
		return this.phase;
	}

	public async init(enemyGroupId: string): Promise<void> {
		this.changePhase(BattlePhase.Init);
		this.hasExecutedPhase = true;

		GameManager.enemyParty.init();
		GameManager.turn.init();

		this.selectedCommand = "";
		this.commandFunc = undefined;

		GameManager.enemyParty.setEnemyParty(enemyGroupId);

		const playerIdList = GameManager.party.getMenberList().map(v => v.partyId);
		const enemyIdList = GameManager.enemyParty.getEnemyPartyList().map(v => v.partyId);
		GameManager.turn.setCharacterList(playerIdList, enemyIdList);
	}

	public async executeBattleStart(): Promise<void> {
		if (this.hasExecutedPhase) return;
		this.hasExecutedPhase = true;

		this.changePhase(BattlePhase.SelectedTrun);
	}

	public async executeSelectedTurn(): Promise<void> {
		if (this.hasExecutedPhase) return;
		this.hasExecutedPhase = true;

		GameManager.turn.getNextTrun();

		this.changePhase(BattlePhase.TrunStart);
	}

	public async executeTurnStart(): Promise<void> {
		if (this.hasExecutedPhase) return;
		this.hasExecutedPhase = true;

		const turn = GameManager.turn.getCurrentTrunCharacter();

		const nextActor =
			turn.type === CharacterType.Player
				? GameManager.party.getMenber(turn.partyId)
				: GameManager.enemyParty.getMenber(turn.partyId);
		console.log(`ターン開始 -> ${nextActor.name}(${turn.type})`);

		// 敵ターンの場合、そのままコマンド選択処理へ
		if (turn.type === CharacterType.Enemy) {
			this.changePhase(BattlePhase.CommandSelect);
		}
	}

	// 選択したコマンドを保持する
	public selectCommand(command: string): void {
		this.selectedCommand = command;
	}
	public getSelectedCommand(): string {
		return this.selectedCommand;
	}

	// TODO: コマンド内容
	public async executeCommandSelect(target: IPartyMenber): Promise<void> {
		if (this.hasExecutedPhase) return;
		this.hasExecutedPhase = true;

		const turn = GameManager.turn.getCurrentTrunCharacter();
		switch (this.selectedCommand) {
			case "attack": {
				const attaker =
					turn.type === CharacterType.Player
						? GameManager.party.getMenber(turn.partyId)
						: GameManager.enemyParty.getMenber(turn.partyId);

				// 通常攻撃コマンドを設定
				this.commandFunc = () => attack(attaker, target);
				break;
			}
			default:
				throw new Error("選択されたコマンドが存在しない");
		}

		// フェイズをコマンド実行へ移行
		this.changePhase(BattlePhase.CommandExecute);
	}

	public async executeCommandExecute(): Promise<void> {
		if (this.hasExecutedPhase) return;
		this.hasExecutedPhase = true;

		if (!this.commandFunc) throw new Error("実行するコマンドが設定されていない");

		await this.commandFunc();

		this.changePhase(BattlePhase.CommandEnd);
	}

	public async executeCommandEnd(): Promise<void> {
		if (this.hasExecutedPhase) return;
		this.hasExecutedPhase = true;

		// TODO: 行動後処理をどこで行うべきか
		GameManager.turn.setGaugeInCurrentTurn();

		// 使用したコマンドを初期化
		this.selectCommand("");
		this.commandFunc = undefined;

		this.changePhase(BattlePhase.TrunEnd);
	}

	public async executeTurnEnd(): Promise<void> {
		if (this.hasExecutedPhase) return;
		this.hasExecutedPhase = true;

		// TODO: 戦闘継続判定
		// this.changePhase(BattlePhase.BattleEnd);

		this.changePhase(BattlePhase.SelectedTrun);
	}

	public async executeBattleEnd(): Promise<void> {
		if (this.hasExecutedPhase) return;
		this.hasExecutedPhase = true;

		this.changePhase(BattlePhase.BattleResult);
	}

	public async executeBattleResult(): Promise<void> {
		if (this.hasExecutedPhase) return;
		this.hasExecutedPhase = true;

		// TODO: レベルアップ判定等

		// MEMO: 戦闘シーン終了処理は Scene_Battle側
	}

	public changePhase(phase: BattlePhase): void {
		console.info("バトルフェイズ - ", phase);
		this.phase = phase;
		this.hasExecutedPhase = false;
	}
}
