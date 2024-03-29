import { AbstractRenderer, Application, DisplayObject, Renderer, settings } from "pixi.js";

/**
 * pixi.jsの描画処理を行うクラス
 */
export default class Canvas {
	// pixi.js本体
	public app: Application;

	public constructor(width: number, height: number) {
		// pixi.jsの初期初期化処理
		const app = new Application({
			width,
			height,
			backgroundColor: 0x000000,
			// antialias: true,     // アンチエイリアスをONに
			// backgroundColor: "green", // 背景色
			//  transparent:      true,     // 背景を透過にしたい場合はこちらを指定
			// toDataURLを使うため (ss撮影用)
			preserveDrawingBuffer: true,
		});
		document.body.appendChild(app.view);

		// z-indexを有効にするためのおまじない
		settings.SORTABLE_CHILDREN = true;

		app.stage.sortableChildren = true;

		this.app = app;
	}

	// 横幅
	protected get width(): number {
		if (!this.app) return 0;
		return this.app.view.width;
	}

	// 縦幅
	protected get height(): number {
		if (!this.app) return 0;
		return this.app.view.height;
	}

	/**
	 * pixi.jsのレンダラーを取得
	 * @returns
	 */
	public getRenderer(): Renderer | AbstractRenderer {
		if (!this.app) throw new Error("not render");
		return this.app.renderer;
	}

	/**
	 * pixi.jsのステージへ描画するものを追加
	 * @param render
	 */
	public addRender(render: DisplayObject): void {
		const stage = this.app.stage;
		stage.addChild(render);
	}

	/**
	 * pixi.jsの描画内容から指定されたレンダーを削除
	 * @param render
	 */
	public deleteRender(render: DisplayObject): void {
		const stage = this.app.stage;
		stage.removeChild(render);
	}

	/**
	 * ステージの更新
	 * @returns
	 */
	public update(): void {
		return this.app.render();
	}

	/**
	 * スクリーンショットを行い画像URLを生成する
	 * @returns
	 */
	public screenShot(): string {
		const render = this.getRenderer();
		// TODO: スクリーンショット時の拡張子
		return render.view.toDataURL("image/png");
	}
}
