import { CharacterType } from "../../../class/Construct/BattleConstruct";

export interface IGameTurnInfo {
	partyId: string;
	// 行動順ゲージ
	gauge: number;
	type: CharacterType;
}
