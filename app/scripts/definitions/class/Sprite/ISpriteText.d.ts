import { ISpriteBaseOption } from "./ISpriteBase";

export interface ISpriteTextOption extends ISpriteBaseOption {
	text: string;
	fontSize: number;
	backgroundImagePath?: string;
	isBackground?: boolean;
}
