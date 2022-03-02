import { ITurnInfo } from "../../definitions/class/Store/IStoreBattleTurn";
import { IPartyMenber } from "../../definitions/modules/field/IPartyMenber";
import Actor from "../../modules/field/Actor";
import Enemy from "../../modules/field/Enemy";
import { CharacterType } from "../Construct/BattleConstruct";
import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
import { Game_Base } from "./Game_Base";

export default class Game_Turn extends Game_Base {
	public init(): void {
		return;
	}

	public getCurrentTrun(): ITurnInfo {
		const turn = StoreManager.battleTurn.getCurrentTurn();
		if (!turn) throw new Error("ターン処理が行えない");
		return turn;
	}

	public getTurnList(): ITurnInfo[] {
		return StoreManager.battleTurn.getTurnList();
	}

	public setTurnList(playerList: Actor[], enemylist: Enemy[]): void {
		return StoreManager.battleTurn.setTurnList(playerList, enemylist);
	}
}
