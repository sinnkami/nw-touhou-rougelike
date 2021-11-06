import { IWindowBaseOption } from "./IWindowBase";

export interface IWindowTargetEnemyOption extends IWindowBaseOption {
	list: IMenuInfo[];
}

export interface IMenuInfo {
	menuId: string;
	order: number;
}
