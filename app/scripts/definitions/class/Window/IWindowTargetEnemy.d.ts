import { IWindowBaseOption } from "./IWindowBase";

export interface IMenuInfo {
	menuId: string;
	order: number;
	/** 飛ばすかどうか */
	skip: boolean;
}
