import { IDataSkill } from "../Data/IDataSkill";
import { IStoreCharacter } from "../Store/IStoreCharacter";
import { IWindowBaseOption } from "./IWindowBase";

export interface IWindowSelectionSkillOption extends IWindowBaseOption {
	fontSize: number;
	list: ISelectionSkillInfo[];
}

export interface ISelectionSkillInfo {
	index: number;
	menuId: string;
	skill: IDataSkill;
}
