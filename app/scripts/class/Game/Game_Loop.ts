import DebugManager from "../manager/DebugManager";
import GameManager from "../manager/GameManager";
import SceneManager from "../manager/SceneManager";
import { Game_Base } from "./Game_Base";

/**
 * ゲーム内処理に関するクラス
 */
export class Game_Loop extends Game_Base {
	// 現在ループ処理が走っているか
	private isLoop = false;

	// 総フレーム数
	public frameCount = 0;

	/**
	 * 初期化処理
	 */
	public init(): void {
		// MEMO: 2重呼び出しとなるのでここでは呼ばない
		// this.gameStart();
	}

	/**
	 * ゲームループ開始処理
	 */
	public async gameLoopStart(): Promise<void> {
		this.isLoop = true;
		requestAnimationFrame(this.gameLoop.bind(this));
		return Promise.resolve();
	}

	/**
	 * ゲームループ停止処理
	 * MEMO: 実際に停止するのは処理のみでウィンドウ自体は存在
	 */
	public async gameLoopStop(): Promise<void> {
		this.isLoop = false;
	}

	/**
	 * 実際のゲームループ
	 * @returns
	 */
	private async gameLoop(): Promise<void> {
		// 終了するかどうかを判定
		if (!this.isLoop) return;

		// フレームカウント
		this.incrementFrame();

		// デバッグ機能でfpsを表示するための処理
		await DebugManager.updateStats();

		// 描画の更新
		GameManager.getCanvas().update();

		// ロード中は暗転した状態でループする
		// if (LoadManager.isLoading) {
		// 	requestAnimationFrame(this.gameLoop.bind(this));
		// 	return;
		// }

		// キー入力の更新
		GameManager.input.update();

		// 現在のシーンを更新
		await SceneManager.updateScene();

		// ループ
		requestAnimationFrame(this.gameLoop.bind(this));
	}

	/**
	 * 総フレーム数をincrementする
	 */
	private incrementFrame(): void {
		this.frameCount++;
	}
}
