import { ITurnInfo } from "../../definitions/class/Store/IStoreBattleTurn";
import Actor from "../../modules/field/Actor";
import Character from "../../modules/field/Character";
import Enemy from "../../modules/field/Enemy";
import { CharacterType } from "../Construct/BattleConstruct";
import Store_Base from "./Store_Base";

/**
 * 現在戦闘中のターン処理に使用する値を管理するクラス
 */
export default class Store_BattleTurn extends Store_Base {
	private turnList: ITurnInfo[] = [];

	public async init(): Promise<void> {
		this.turnList.length = 0;
	}

	public getTurnList(): ITurnInfo[] {
		return this.turnList;
	}

	public setTurnList(playerList: Actor[], enemyList: Enemy[]): void {
		let index = 0;

		const add = (type: CharacterType, character: Actor | Enemy) => {
			index++;
			this.turnList.push({
				turnId: String(index),
				character,
				gauge: 1000,
				type,
			});
		};

		// ターン処理用データを設定
		playerList.forEach(v => add(CharacterType.Player, v));
		enemyList.forEach(v => add(CharacterType.Enemy, v));
	}

	public getCurrentTurn(): ITurnInfo | undefined {
		return this.turnList.find(v => v.gauge <= 0 && !v.character.isDead);
	}
}
