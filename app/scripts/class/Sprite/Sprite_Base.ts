import { Container, Spritesheet } from "pixi.js";
import { ISpriteBaseOption } from "../../definitions/class/Sprite/ISpriteBase";
import GameManager from "../GameManager";

// スプライトのデフォルト名
export const DEFAULT_NAME = "sprite";

/**
 * スプライト汎用クラス
 */
export default class Sprite_Base {
	// スプライト本体
	private sprite?: Container;

	// スプライトシート
	private sheet?: Spritesheet;

	// 次に更新できるフレーム
	protected nextUpdateFrame: number;

	// スプライト更新時に呼び出す関数
	protected updateFunc?: (frame: number) => void;

	// スプライト名
	protected readonly name: string;

	// スプライトの初期横幅
	protected readonly width: number;

	// スプライトの初期縦幅
	protected readonly height: number;

	// スプライトの初期x座標
	protected readonly x: number;

	// スプライトの初期y座標
	protected readonly y: number;

	// スプライトの表示ディレイ
	protected readonly delay: number;

	public constructor(option: ISpriteBaseOption) {
		this.name = option.name || DEFAULT_NAME;
		this.width = option.width || 0;
		this.height = option.height || 0;
		this.x = option.x;
		this.y = option.y;

		this.delay = option.delay || 0;

		this.nextUpdateFrame = 0;
	}

	/** アニメーション中かどうか */
	public get isAnimation(): boolean {
		// MEMO: 現在フレームと次回更新フレームから判定
		return GameManager.loop.frameCount <= this.nextUpdateFrame;
	}

	/**
	 * 初期化処理
	 * @returns
	 */
	public async init(): Promise<void> {
		// スプライトの入れ物を設定
		const container = new Container();
		container.name = this.name;
		this.setSprite(container);

		// 描画を行うクラスに登録
		const canvas = GameManager.getCanvas();
		canvas.addRender(container);

		// TODO: スプライトシートの処理まで入れて良いかもしれない

		return Promise.resolve();
	}

	/**
	 * スプライトの更新処理
	 * @returns
	 */
	public update(): void {
		const func = this.getUpdateFunc();
		func(GameManager.loop.frameCount);
		return;
	}

	/**
	 * スプライトの削除処理
	 * @returns
	 */
	public destroy(): void {
		const sprite = this.getSprite();
		if (!sprite) return;

		sprite.destroy();

		return;
	}

	/**
	 * スプライトを取得
	 * @returns sprite | undefined
	 */
	public getSprite(): Container | undefined {
		return this.sprite;
	}

	/**
	 * スプライトシートを取得
	 * @returns spritesheet | undefied
	 */
	public getSheet(): Spritesheet | undefined {
		return this.sheet;
	}

	/**
	 * スプライトの更新する際、実行する処理を取得
	 * @returns 更新処理
	 */
	protected getUpdateFunc(): (frame: number) => void {
		let func = this.updateFunc;
		if (!func) {
			func = () => {
				return;
			};
		}
		return func;
	}

	/**
	 * スプライトを設定する
	 * @param sprite
	 */
	protected setSprite(sprite: Container): void {
		this.sprite = sprite;
	}

	/**
	 * スプライトシートを設定する
	 * @param sheet
	 */
	protected setSheet(sheet: Spritesheet): void {
		this.sheet = sheet;
	}

	/**
	 * スプライトを更新する際、実行する処理を設定
	 * @param func
	 */
	protected setUpdateFunc(func: (frame: number) => void): void {
		this.updateFunc = func;
	}

	/**
	 * スプライトを更新する際の処理を削除
	 */
	protected deleteUpdateFunc(): void {
		this.updateFunc = () => {
			return;
		};
	}

	/**
	 * スプライトの現在地を初期化
	 * @returns
	 */
	public clearPosition(): void {
		const sprite = this.getSprite();
		if (!sprite) return;

		sprite.x = 0;
		sprite.y = 0;
	}
}
