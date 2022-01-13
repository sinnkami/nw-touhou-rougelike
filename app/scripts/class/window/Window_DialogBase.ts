import { IWindowBaseOption } from "../../definitions/class/Window/IWindowBase";
import { IBaseDialogOption } from "../../definitions/class/Window/IWindowDialogBase";
import { CommonConstruct } from "../Construct/CommonConstruct";
import Sprite_Base from "../Sprite/Sprite_Base";
import Sprite_Mask from "../Sprite/Sprite_Mask";
import Sprite_Selected from "../Sprite/Sprite_Selected";

/** 解像度 */
const SIZE = CommonConstruct.size;

/**
 * ダイアログウィンドウの汎用クラス
 */
export default class Window_DialogBase extends Sprite_Base {
	private submit?: () => void;
	private cansel?: () => void;

	private selectSprite: Sprite_Selected = new Sprite_Selected();

	public init(option: IBaseDialogOption): void {
		super.init(option);

		this.submit = option.submit;
		this.cansel = option.cansel;
	}

	public async setSprite(): Promise<void> {
		super.setContainer();
		const container = this.getContainer();

		// 描画する背景画像を設定
		// MEMO: 画像ではなくマスクを掛ける
		const BackgroundImageRender = new Sprite_Mask();
		await BackgroundImageRender.init({
			x: 0,
			y: 0,
			width: SIZE.width,
			height: SIZE.height,
		});
		await BackgroundImageRender.setSprite();
		container.addChild(BackgroundImageRender.getContainer());
	}

	/**
	 * 更新処理
	 * @override
	 */
	public update(): void {
		super.update();
	}
}
