import { IGameTurnInfo } from "../../definitions/class/Game/IGameTurn";
import { IPartyMenber } from "../../definitions/modules/field/IPartyMenber";
import Actor from "../../modules/field/Actor";
import Enemy from "../../modules/field/Enemy";
import { CharacterType } from "../Construct/BattleConstruct";
import GameManager from "../Manager/GameManager";
import { Game_Base } from "./Game_Base";

export default class Game_Turn extends Game_Base {
	private characterList: IGameTurnInfo[] = [];

	private currntTrun?: IGameTurnInfo = undefined;

	public init(): void {
		this.characterList = [];
		this.currntTrun = undefined;
	}

	public setCharacterList(playerList: Actor[], enemyList: Enemy[]): void {
		this.init();

		// ターン処理用データを設定
		const list: IGameTurnInfo[] = [];
		playerList.forEach((v, index) => {
			list.push({
				turnId: String(index),
				character: v,
				gauge: 1000,
				type: CharacterType.Player,
			});
		});
		enemyList.forEach((v, index) => {
			list.push({
				turnId: String(index),
				character: v,
				gauge: 1000,
				type: CharacterType.Enemy,
			});
		});
		this.characterList = list;
	}

	public getNextTrun(): IGameTurnInfo {
		const turn = this.characterList.find(v => v.gauge <= 0 && !v.character.isDead);
		if (turn) {
			this.currntTrun = turn;
			return turn;
		}

		this.characterList.forEach(v => (v.gauge -= v.character.agility));
		return this.getNextTrun();
	}

	public getCurrentTrun(): IGameTurnInfo {
		const turn = this.currntTrun;
		if (!turn) throw new Error("ターン処理が行えない");
		return turn;
	}

	public getTurn(turnId: string): IGameTurnInfo | undefined {
		return this.characterList.find(v => v.turnId === turnId);
	}

	// 行動順を再設定
	public setGaugeInCurrentTurn(): void {
		// TODO: コマンド内容に対応して行動順を設定できるようにする
		const turn = this.getCurrentTrun();
		turn.gauge = 1000;
	}
}
