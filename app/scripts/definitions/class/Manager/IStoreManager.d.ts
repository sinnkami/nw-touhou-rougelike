import Actor from "../../../modules/field/Actor";
import { IStoreCharacter } from "../Store/IStoreCharacter";
import { IStoreMaterial } from "../Store/IStoreMaterial";

export interface ISaveData {
	character: IStoreCharacter[];
	party: Actor[];
	material: IStoreMaterial;
}
