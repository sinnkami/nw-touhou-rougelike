import { IDataEnemy } from "../../definitions/class/Data/IDataEnemy";
import { IPartyMenber } from "../../definitions/modules/field/IPartyMenber";
import { BattlePhase, CharacterType } from "../Construct/BattleConstruct";
import DataManager from "../Manager/DataManager";
import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
import Store_Base from "../Store/Store_Base";
import { attack } from "./Battle_Commands/Attack";
import { Game_Base } from "./Game_Base";

export default class Game_Battle extends Game_Base {
	// バトルフェイズ
	private get phase(): BattlePhase {
		return StoreManager.battle.getPhase();
	}
	private set phase(phase: BattlePhase) {
		StoreManager.battle.setPhase(phase);
	}

	// そのフェイズを実行したか
	private get hasExecutedPhase(): boolean {
		return StoreManager.battle.getHasExecutedPhase();
	}
	private set hasExecutedPhase(executed: boolean) {
		StoreManager.battle.setHasExecutedPhase(executed);
	}

	// 選択されたコマンド
	private get commandType(): string {
		return StoreManager.battle.getCommandType();
	}
	private set commandType(type: string) {
		StoreManager.battle.setCommandType(type);
	}

	// 実行するコマンド関数
	private get command(): () => Promise<void> {
		return StoreManager.battle.getCommand();
	}
	private set command(command: (() => Promise<void>) | undefined) {
		StoreManager.battle.setCommand(command);
	}

	public async init(enemyGroupId: string): Promise<void> {
		StoreManager.battle.init();
		this.hasExecutedPhase = true;

		GameManager.enemyParty.init();
		GameManager.turn.init();

		GameManager.enemyParty.setEnemyParty(enemyGroupId);

		GameManager.turn.setCharacterList(
			GameManager.party.getMenberList(),
			GameManager.enemyParty.getEnemyPartyList()
		);
	}

	// 選択したコマンドを保持する
	public selectCommandType(command: string): void {
		this.commandType = command;
	}

	public getCommandType(): string {
		return this.commandType;
	}

	public getPhase(): BattlePhase {
		return this.phase;
	}

	public changePhase(phase: BattlePhase): void {
		console.info("バトルフェイズ - ", phase);
		this.phase = phase;
		this.hasExecutedPhase = false;
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

		const turn = GameManager.turn.getCurrentTrun();
		console.log(`ターン開始 -> ${turn.character.name}(${turn.type})`);

		// 敵ターンの場合、そのままコマンド選択処理へ
		if (turn.type === CharacterType.Enemy) {
			this.changePhase(BattlePhase.CommandSelect);
		}
	}

	// TODO: コマンド内容
	public async executeCommandSelect(target: IPartyMenber): Promise<void> {
		if (this.hasExecutedPhase) return;
		this.hasExecutedPhase = true;

		const turn = GameManager.turn.getCurrentTrun();
		switch (this.commandType) {
			case "attack": {
				// 通常攻撃コマンドを設定
				const source = turn.character;
				this.command = () => attack(source, target);
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

		await this.command();

		this.changePhase(BattlePhase.CommandEnd);
	}

	public async executeCommandEnd(): Promise<void> {
		if (this.hasExecutedPhase) return;
		this.hasExecutedPhase = true;

		// TODO: 行動後処理をどこで行うべきか
		GameManager.turn.setGaugeInCurrentTurn();

		// 使用したコマンドを初期化
		this.selectCommandType("");
		this.command = undefined;

		this.changePhase(BattlePhase.TrunEnd);
	}

	public async executeTurnEnd(): Promise<void> {
		if (this.hasExecutedPhase) return;
		this.hasExecutedPhase = true;

		// TODO: 戦闘継続判定
		const enemyList = GameManager.enemyParty.getEnemyPartyList().filter(v => !v.isDead);
		if (!enemyList.length) {
			this.changePhase(BattlePhase.BattleEnd);
			return;
		}

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

		console.log("戦闘終了");

		// MEMO: 戦闘シーン終了処理は Scene_Battle側
	}
}
