import { ProcessName, ResourceName } from "../../../class/Scene/Scene_Dungeon";
import Sprite_Character from "../../../class/Sprite/Sprite_Character";
import Sprite_Map from "../../../class/Sprite/Sprite_Map";
import { Sprite_Message } from "../../../class/Sprite/Sprite_Message";
import { Sprite_Text } from "../../../class/Sprite/Sprite_Text";

// プロセス情報
export interface IProcessInfo {
	[ProcessName.PlayerRender]: {
		process: (time: number) => Promise<void>;
		class: Sprite_Character;
	};
	[ProcessName.MapRender]: {
		process: (time: number) => Promise<void>;
		class: Sprite_Map;
	};
	[ProcessName.InputProcess]: {
		process: (time: number) => Promise<void>;
		class: undefined;
	};
	// [ProcessName.TestProcess]: {
	// 	process: (time: number) => Promise<void>;
	// 	class: Sprite_Text;
	// };
	[ProcessName.StairsText]: {
		process: (time: number) => Promise<void>;
		class: Sprite_Text;
	};
}

// Resourceの情報（パス）
export interface IResourceInfo {
	[ResourceName.Map]: string;
	[ResourceName.Character]: string;
}
