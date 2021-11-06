import { IGameTurnInfo } from "../../definitions/class/Game/IGameTurn";
import { IStoreParty } from "../../definitions/class/Store/IStoreParty";
import { CharacterType } from "../Construct/BattleConstruct";
import GameManager from "../Manager/GameManager";
import { Game_Base } from "./Game_Base";

export default class Game_Turn extends Game_Base {
	private characterList: IGameTurnInfo[] = [];

	private currntTrunCharacterId: string = "";

	public init(): void {
		this.characterList = [];
		this.currntTrunCharacterId = "";
	}

	public setCharacterList(playerIdList: string[], enemyIdList: string[]): void {
		this.init();
		playerIdList.forEach(v => {
			this.characterList.push({
				characterId: v,
				gauge: 1000,
				type: CharacterType.Player,
			});
		});
		enemyIdList.forEach(v => {
			this.characterList.push({
				characterId: v,
				gauge: 1000,
				type: CharacterType.Enemy,
			});
		});
	}

	public getNextTrun(): IGameTurnInfo {
		const turn = this.characterList.find(v => v.gauge <= 0);
		console.log(turn);
		if (turn) {
			this.currntTrunCharacterId = turn.characterId;
			return turn;
		}

		this.characterList.forEach(v => {
			console.log(v);
			const id = v.characterId;
			switch (v.type) {
				// TODO: コマンド速度調整
				case CharacterType.Player: {
					const character = GameManager.character.getCharacter(id);
					v.gauge -= character.agility;
				}
				case CharacterType.Enemy: {
					const character = GameManager.enemy.getEnemy(id);
					v.gauge -= character.agility;
				}
			}
		});
		return this.getNextTrun();
	}

	public getCurrentTrunCharacter(): IGameTurnInfo {
		const turn = this.characterList.find(v => v.characterId === this.currntTrunCharacterId);
		if (!turn) throw new Error("ターン処理が行えない");
		return turn;
	}
}
