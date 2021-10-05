import { ProcessName, ResourceName } from "../../../class/Scene/Scene_Lobby";
import { Sprite_Background } from "../../../class/Sprite/Sprite_Background";
import { Sprite_Text } from "../../../class/Sprite/Sprite_Text";
import Window_LobbyMenuSelection from "../../../class/window/Window_LobbyMenuSelection";

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
	[ProcessName.LobbyText]: {
		process: (time: number) => Promise<void>;
		class: Sprite_Text;
	};
	[ProcessName.LobbyMenuSelection]: {
		process: (time: number) => Promise<void>;
		class: Window_LobbyMenuSelection;
	};
}

// Resourceの情報（パス）
export interface IResourceInfo {
	[ResourceName.BackgroundImage]: string;
	[ResourceName.MessageBackgroundImage]: string;
}
