import GameManager from "../GameManager";
import LoadManager from "../LoadManager";

/**
 * シーン汎用クラス
 */
export default class Scene_Base {
	/** シーンのクラス名 */
	public get name(): string {
		return this.constructor.name;
	}

	/**
	 * シーンを開始する際の処理
	 * @returns
	 */
	public async startScene(): Promise<any> {
		// キー情報を初期化
		GameManager.input.init();
		return true;
	}

	/**
	 * シーンを更新する際の処理
	 * @returns
	 */
	public async updateScene(): Promise<any> {
		if (LoadManager.isLoading) return false;
		return true;
	}

	/**
	 * シーンを停止する際の処理
	 * @returns
	 */
	public async stopScene(): Promise<any> {
		return true;
	}
}
