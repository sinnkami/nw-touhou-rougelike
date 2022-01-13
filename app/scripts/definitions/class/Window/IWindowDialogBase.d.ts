import { IWindowBaseOption } from "./IWindowBase";

export interface IBaseDialogOption extends IWindowBaseOption {
	header: string;
	message: string;

	submit?: () => void;
	cansel?: () => void;
}
