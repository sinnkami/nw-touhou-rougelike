import { IWindowBaseOption } from "./IWindowBase";

export interface IIWindowMenuOption extends IWindowBaseOption {
	fontSize: number;
	list: IMenuInfo[];
}

export interface IMenuInfo {
	menuId: string;
	x: number;
	y: number;
	text: string;
}
