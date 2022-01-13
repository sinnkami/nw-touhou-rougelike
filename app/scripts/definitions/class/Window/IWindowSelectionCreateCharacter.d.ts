import { IDataCharacter } from "../Data/IDataCharacter";
import { IWindowBaseOption } from "./IWindowBase";

export interface IWindowSelectionCreateCharacterOption extends IWindowBaseOption {
	fontSize: number;
	list: ICharacterMenuInfo[];
}

export interface ICharacterMenuInfo {
	index: number;
	menuId: string;
	character: IDataCharacter;
	isMask?: boolean;
}
