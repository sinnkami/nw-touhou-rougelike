import Sprite_Base from "../../../class/Sprite/Sprite_Base";
import Window_Base from "../../../class/window/Window_Base";

// プロセス情報
export interface IProcessInfo {
	name: string;
	class?: Sprite_Base | Window_Base;
	process: (time: number) => Promise<void>;
}

// パスの辞書
export interface IResourcePathDict {
	[key: string]: string;
}
