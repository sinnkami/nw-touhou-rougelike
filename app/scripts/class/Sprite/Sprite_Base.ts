import { Container, Spritesheet } from "pixi.js";
import { ISpriteBaseOption } from "../../definitions/class/Sprite/ISpriteBase";
import GameManager from "../manager/GameManager";
import LoadManager from "../manager/LoadManager";

// スプライトのデフォルト名
export const DEFAULT_NAME = "sprite";

/**
 * スプライト汎用クラス
 */
export default class Sprite_Base {
	// コンテナ
	private container: Container = new Container();

	// スプライトシート
	private sheet?: Spritesheet;

	// 次に更新できるフレーム
	protected nextUpdateFrame: number = 0;

	// スプライト更新時に呼び出す関数
	protected updateFunc?: (frame: number) => void;

	// スプライト名
	protected name: string = "";

	// スプライトの初期横幅
	protected width: number = 0;

	// スプライトの初期縦幅
	protected height: number = 0;

	// スプライトの初期x座標
	protected x: number = 0;

	// スプライトの初期y座標
	protected y: number = 0;

	// スプライトの表示ディレイ
	protected delay: number = 0;

	public init(option: ISpriteBaseOption): void {
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
	 * スプライトの設定
	 * @returns
	 */
	public async setSprite(): Promise<void> {
		// MEMO: オーバーライドして使用する
		return;
	}

	/**
	 * コンテナの設定
	 * @returns
	 */
	protected async setContainer(): Promise<void> {
		// スプライトの入れ物を設定
		this.container.name = this.name;

		// 描画を行うクラスに登録
		const canvas = GameManager.getCanvas();
		canvas.addRender(this.container);

		// TODO: スプライトシートの処理まで入れて良いかもしれない

		return Promise.resolve();
	}

	/**
	 * スプライトの更新処理
	 * @returns
	 */
	public update(): void {
		if (LoadManager.isLoading) return;

		const func = this.getUpdateFunc();
		func(GameManager.loop.frameCount);
		return;
	}

	/**
	 * スプライトの削除処理
	 * @returns
	 */
	public destroy(): void {
		const container = this.getContainer();
		if (!container) return;

		container.destroy();

		return;
	}

	/**
	 * コンテナを取得
	 * @returns container
	 */
	public getContainer(): Container {
		return this.container;
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
		const container = this.getContainer();
		if (!container) return;

		container.x = 0;
		container.y = 0;
	}
}
