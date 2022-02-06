import { IDataEnemy } from "../../definitions/class/Data/IDataEnemy";
import { IPartyMenber } from "../../definitions/modules/field/IPartyMenber";
import sleep from "../../modules/utils/sleep";
import { BattlePhase, CharacterType } from "../Construct/BattleConstruct";
import { CharacterStatus } from "../Construct/CharacterConstruct";
import { Material } from "../Construct/MaterialConstruct";
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

	// そのフェイズを実行したか
	private get hasExecutedPhase(): boolean {
		return StoreManager.battle.getHasExecutedPhase();
	}

	// 選択されたコマンド
	private get commandType(): string {
		return StoreManager.battle.getCommandType();
	}

	// 実行するコマンド関数
	private get command(): () => Promise<void> {
		return StoreManager.battle.getCommand();
	}

	// 表示するバトルテキストリスト
	private get battleLogList(): string[] {
		return StoreManager.battle.getBattleLogList();
	}

	public async init(enemyGroupId: string): Promise<void> {
		StoreManager.battle.init();
		StoreManager.battle.setHasExecutedPhase(true);

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
		StoreManager.battle.setCommandType(command);
	}

	public getCommandType(): string {
		return this.commandType;
	}

	public getPhase(): BattlePhase {
		return this.phase;
	}

	public changePhase(phase: BattlePhase): void {
		console.info("バトルフェイズ - ", phase);

		StoreManager.battle.setPhase(phase);
		StoreManager.battle.setHasExecutedPhase(false);
	}

	public async executeBattleStart(): Promise<void> {
		if (this.hasExecutedPhase) return;
		StoreManager.battle.setHasExecutedPhase(true);

		const enemyList = GameManager.enemyParty.getEnemyPartyList();
		const enemyPartyName = `${enemyList[0].name}${enemyList.length > 1 ? "達" : ""}が現れた！`;
		this.addBattleLog(enemyPartyName);
		await sleep(2000);

		this.changePhase(BattlePhase.SelectedTrun);
	}

	public async executeSelectedTurn(): Promise<void> {
		if (this.hasExecutedPhase) return;
		StoreManager.battle.setHasExecutedPhase(true);

		GameManager.turn.getNextTrun();

		this.changePhase(BattlePhase.TrunStart);
	}

	public async executeTurnStart(): Promise<void> {
		if (this.hasExecutedPhase) return;
		StoreManager.battle.setHasExecutedPhase(true);

		const turn = GameManager.turn.getCurrentTrun();
		console.info(`ターン開始 -> ${turn.character.name}(${turn.type})`);

		// バトルログをクリア
		GameManager.battle.clearBattleLogList();

		// 敵ターンの場合、そのままコマンド選択処理へ
		if (turn.type === CharacterType.Enemy) {
			await sleep(100);
			this.changePhase(BattlePhase.CommandSelect);
		}
	}

	// TODO: コマンド内容
	public async executeCommandSelect(target: IPartyMenber): Promise<void> {
		if (this.hasExecutedPhase) return;
		StoreManager.battle.setHasExecutedPhase(true);

		const turn = GameManager.turn.getCurrentTrun();
		switch (this.commandType) {
			case "attack": {
				const source = turn.character;

				// 通常攻撃コマンドを設定
				const command = () => attack(source, target);
				StoreManager.battle.setCommand(command);

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
		StoreManager.battle.setHasExecutedPhase(true);

		await this.command();

		this.changePhase(BattlePhase.CommandEnd);
	}

	public async executeCommandEnd(): Promise<void> {
		if (this.hasExecutedPhase) return;
		StoreManager.battle.setHasExecutedPhase(true);

		// TODO: 行動後処理をどこで行うべきか
		GameManager.turn.setGaugeInCurrentTurn();

		// 使用したコマンドを初期化
		this.selectCommandType("");
		StoreManager.battle.setCommand(undefined);

		this.changePhase(BattlePhase.TrunEnd);
	}

	public async executeTurnEnd(): Promise<void> {
		if (this.hasExecutedPhase) return;
		StoreManager.battle.setHasExecutedPhase(true);

		// バトルログをクリア
		GameManager.battle.clearBattleLogList();

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
		StoreManager.battle.setHasExecutedPhase(true);

		const enemyList = GameManager.enemyParty.getEnemyPartyList();
		const enemyPartyName = `${enemyList[0].name}${enemyList.length > 1 ? "達" : ""}を倒した！`;
		this.addBattleLog(enemyPartyName);
		await sleep(2000);

		this.changePhase(BattlePhase.BattleResult);
	}

	public async executeBattleResult(callback: () => Promise<void>): Promise<void> {
		if (this.hasExecutedPhase) return;
		StoreManager.battle.setHasExecutedPhase(true);

		const enemyList = GameManager.enemyParty.getEnemyPartyList();

		// この戦闘で得られた総経験値
		const totalExp = enemyList.reduce((sum, enemy) => {
			return sum + enemy.exp;
		}, 0);

		GameManager.battle.clearBattleLogList();
		GameManager.battle.addBattleLog(`${totalExp}経験値を獲得！`);
		await sleep(200);

		GameManager.material.addMaterial(
			Material.Flame,
			enemyList.reduce((sum, enemy) => sum + enemy.flame, 0)
		);
		GameManager.material.addMaterial(
			Material.Water,
			enemyList.reduce((sum, enemy) => sum + enemy.water, 0)
		);
		GameManager.material.addMaterial(
			Material.Grass,
			enemyList.reduce((sum, enemy) => sum + enemy.grass, 0)
		);
		GameManager.material.addMaterial(
			Material.Thunder,
			enemyList.reduce((sum, enemy) => sum + enemy.thunder, 0)
		);
		GameManager.material.addMaterial(
			Material.Light,
			enemyList.reduce((sum, enemy) => sum + enemy.light, 0)
		);
		GameManager.material.addMaterial(
			Material.Darkness,
			enemyList.reduce((sum, enemy) => sum + enemy.darkness, 0)
		);
		GameManager.battle.addBattleLog(`時空片を獲得！`);
		await sleep(1000);

		// TODO: レベルアップ判定等
		console.info("レベルリザルト");
		for (const actor of GameManager.party.getMenberList()) {
			const beforeLevel = actor.level;

			// TODO: 人数によって割るかどうかを決める
			actor.addExp(totalExp);

			// レベルアップが出来なくなるまで回す
			while (actor.canLevelUp()) {
				actor.addLevel(1);
			}

			if (beforeLevel !== actor.level) {
				console.info(`${actor.name} レベルアップ`);
				console.info(`Lv. ${beforeLevel} -> ${actor.level}`);
				console.info(
					`HP: ${actor.calcStatus(beforeLevel, actor.growthType, CharacterStatus.Hp)} -> ${actor.maxHp}`
				);
				GameManager.battle.clearBattleLogList();
				GameManager.battle.addBattleLog(`${actor.name}はレベル${actor.level}に上がった！`);
				await sleep(1000);
				GameManager.battle.addBattleLog(
					`hpが${actor.maxHp - actor.calcStatus(beforeLevel, actor.growthType, CharacterStatus.Hp)}増えた！`
				);
				await sleep(100);
				GameManager.battle.addBattleLog(
					`mpが${actor.maxMp - actor.calcStatus(beforeLevel, actor.growthType, CharacterStatus.Mp)}増えた！`
				);
				await sleep(100);
				GameManager.battle.addBattleLog(
					`attackが${
						actor.attack - actor.calcStatus(beforeLevel, actor.growthType, CharacterStatus.Attack)
					}増えた！`
				);
				await sleep(100);
				GameManager.battle.addBattleLog(
					`defenseが${
						actor.defense - actor.calcStatus(beforeLevel, actor.growthType, CharacterStatus.Defense)
					}増えた！`
				);
				await sleep(100);
				GameManager.battle.addBattleLog(
					`magicalが${
						actor.magical - actor.calcStatus(beforeLevel, actor.growthType, CharacterStatus.Magical)
					}増えた！`
				);
				await sleep(100);
				GameManager.battle.addBattleLog(
					`agilityが${
						actor.agility - actor.calcStatus(beforeLevel, actor.growthType, CharacterStatus.Agility)
					}増えた！`
				);
				await sleep(100);
				GameManager.battle.addBattleLog(
					`dexterityが${
						actor.dexterity - actor.calcStatus(beforeLevel, actor.growthType, CharacterStatus.Dexterity)
					}増えた！`
				);
				await sleep(2000);
			}
		}
		console.info("--------------");

		console.info("戦闘終了");

		// MEMO: 戦闘シーン終了処理は Scene_Battle側
		return callback();
	}

	public getBattleLogList(): string[] {
		return this.battleLogList;
	}

	public addBattleLog(log: string): void {
		StoreManager.battle.addBattleLog(log);
	}

	public clearBattleLogList(): void {
		StoreManager.battle.clearBattleLogList();
	}
}
