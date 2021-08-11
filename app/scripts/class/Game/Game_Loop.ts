import DebugManager from "../DebugManager";
import GameManager from "../GameManager";
import SceneManager from "../SceneManager";
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
		this.gameStart();
	}

	/**
	 * ゲーム開始処理
	 */
	public gameStart(): void {
		this.isLoop = true;
		SceneManager.startScene();
		requestAnimationFrame(this.gameLoop.bind(this));
	}

	/**
	 * ゲームの停止
	 * MEMO: 実際に停止するのは処理のみでウィンドウ自体は存在
	 */
	public gameStop(): void {
		this.isLoop = false;
	}

	/**
	 * 実際のゲームループ
	 * @returns
	 */
	private gameLoop(): void {
		// 終了するかどうかを判定
		if (!this.isLoop) return;

		// フレームカウント
		this.incrementFrame();

		// デバッグ機能でfpsを表示するための処理
		DebugManager.updateStats();

		// 描画の更新
		GameManager.getCanvas().update();

		// キー入力の更新
		GameManager.input.update();

		// 現在のシーンを更新
		SceneManager.updateScene();

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
