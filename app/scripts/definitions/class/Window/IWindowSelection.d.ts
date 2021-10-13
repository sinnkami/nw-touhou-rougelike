import { IWindowBaseOption } from "./IWindowBase";

export interface IWindowSelectionOption extends IWindowBaseOption {
	fontSize: number;
	list: ISelectionInfo[];
}

export interface ISelectionInfo {
	selectionId: string;
	index: number;
	text: string;
}
