import { IGameTurnInfo } from "../../definitions/class/Game/IGameTurn";
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

	public setCharacterList(playerIdList: string[], enemyIdList: string[]): void {
		this.init();
		playerIdList.forEach(v => {
			this.characterList.push({
				partyId: v,
				gauge: 1000,
				type: CharacterType.Player,
			});
		});
		enemyIdList.forEach(v => {
			this.characterList.push({
				partyId: v,
				gauge: 1000,
				type: CharacterType.Enemy,
			});
		});
	}

	public getNextTrun(): IGameTurnInfo {
		const turn = this.characterList.find(v => v.gauge <= 0);
		if (turn) {
			this.currntTrun = turn;
			return turn;
		}

		this.characterList.forEach(v => {
			const id = v.partyId;
			switch (v.type) {
				// TODO: コマンド速度調整
				case CharacterType.Player: {
					const character = GameManager.party.getMenber(id);
					v.gauge -= character.agility;
					break;
				}
				case CharacterType.Enemy: {
					const character = GameManager.enemyParty.getMenber(id);
					v.gauge -= character.agility;
					break;
				}
			}
		});
		return this.getNextTrun();
	}

	public getCurrentTrunCharacter(): IGameTurnInfo {
		const turn = this.currntTrun;
		if (!turn) throw new Error("ターン処理が行えない");
		return turn;
	}

	// 行動順を再設定
	public setGaugeInCurrentTurn(): void {
		// TODO: コマンド内容に対応して行動順を設定できるようにする
		const turn = this.getCurrentTrunCharacter();
		turn.gauge = 1000;
	}
}
