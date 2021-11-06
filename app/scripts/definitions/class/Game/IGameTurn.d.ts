import { CharacterType } from "../../../class/Construct/BattleConstruct";

export interface IGameTurnInfo {
	characterId: string;
	// 行動順ゲージ
	gauge: number;
	type: CharacterType;
}
