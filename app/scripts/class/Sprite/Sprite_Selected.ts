import { Graphics } from "@pixi/graphics";
import { ISpriteBaseOption } from "../../definitions/class/Sprite/ISpriteBase";
import Sprite_Base from "./Sprite_Base";

const SPRITE_NAME = "selected";

export default class Sprite_Selected extends Sprite_Base {
	// アニメーション用に保持するアルファ値
	private currentAlpha: number = 0.1;
	// アルファ値を下げるかどうか
	private subtractionAlpha: boolean = false;

	public init(option: ISpriteBaseOption): void {
		if (option.name === undefined) option.name = SPRITE_NAME;
		super.init(option);
	}

	public async setSprite(): Promise<void> {
		await super.setContainer();
		const container = this.getContainer();

		// コンテナの初期位置を設定
		container.setTransform(this.x, this.y);

		const sprite = new Graphics();

		// TODO: colorとalphaの指定
		this.updateFunc = () => {
			if (this.subtractionAlpha) {
				this.currentAlpha -= 0.01;
			} else {
				this.currentAlpha += 0.01;
			}

			sprite.clear();
			sprite.lineStyle(2, 0xffff00, 1);
			sprite.beginFill(0xffff00, this.currentAlpha);
			sprite.drawRect(0, 0, this.width, this.height);
			sprite.endFill();

			if (this.currentAlpha >= 0.5) {
				this.subtractionAlpha = true;
			} else if (this.currentAlpha <= -0.2) {
				this.subtractionAlpha = false;
			}
		};

		container.addChild(sprite);
	}
}
