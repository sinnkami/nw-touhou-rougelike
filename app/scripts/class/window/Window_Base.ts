import { IWindowBaseOption } from "../../definitions/class/Window/IWindowBase";
import Sprite_Base from "../Sprite/Sprite_Base";

/**
 * ウィンドウの汎用クラス
 * MEMO: ほぼスプライト
 */
export default class Window_Base extends Sprite_Base {
	public init(option: IWindowBaseOption): void {
		super.init(option);
	}
}
