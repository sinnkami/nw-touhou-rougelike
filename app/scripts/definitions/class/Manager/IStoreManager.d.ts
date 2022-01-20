import Actor from "../../../modules/field/Actor";
import { IStoreCharacter } from "../Store/IStoreCharacter";

export interface ISaveData {
	character: IStoreCharacter[];
	party: Actor[];
}
