import { IStoreCharacter } from "../Store/IStoreCharacter";
import { IWindowBaseOption } from "./IWindowBase";

export interface IWindowPartyPlanningPlaceOption extends IWindowBaseOption {
	fontSize: number;
	list: ICharacterMenuInfo[];
}

export interface ICharacterMenuInfo {
	index: number;
	menuId: string;
	character: IStoreCharacter;
	isMask?: boolean;
}
