import { ISpriteBaseOption } from "./ISpriteBase";

export interface ISpriteCharacterOption extends ISpriteBaseOption {
	path: string;
	animationSpeed?: number;
}