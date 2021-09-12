import { ProcessName, ResourceName } from "../../../class/Scene/Scene_Title";
import { Sprite_Background } from "../../../class/Sprite/Sprite_Background";

// プロセス情報
export interface IProcessInfo {
	[ProcessName.InputProcess]: {
		process: (time: number) => Promise<void>;
		class: undefined;
	};
	[ProcessName.BackgroundImage]: {
		process: (time: number) => Promise<void>;
		class: Sprite_Background;
	};
}

// Resourceの情報（パス）
export interface IResourceInfo {
	[ResourceName.BackgroundImage]: string;
}
