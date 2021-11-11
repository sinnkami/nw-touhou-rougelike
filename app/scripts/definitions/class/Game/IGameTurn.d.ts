import { CharacterType } from "../../../class/Construct/BattleConstruct";
import { IPartyMenber } from "../../modules/field/IPartyMenber";

export interface IGameTurnInfo {
	turnId: string;
	character: IPartyMenber;
	// 行動順ゲージ
	gauge: number;
	type: CharacterType;
}
