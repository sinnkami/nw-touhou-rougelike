import { Game_Base } from "../../../class/Game/Game_Base";
import Scene_Base from "../../../class/Scene/Scene_Base";
import Sprite_Base from "../../../class/Sprite/Sprite_Base";

// プロセス情報の辞書
export interface IProcessDict {
	[name: string]: IProcessInfo;
}

// プロセスの情報
export interface IProcessInfo {
	// 名前
	name: string;

	// 該当クラス
	class?: Game_Base | Sprite_Base | Scene_Base;

	// 処理内容
	process: (time: number) => Promise<void>;
}

// Resourceの情報（パス）
export interface IResourceInfo {
	[name: string]: string;
}
