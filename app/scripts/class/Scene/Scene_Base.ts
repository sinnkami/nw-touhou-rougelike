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
	public async startScene(): Promise<void> {
		return Promise.resolve();
	}

	/**
	 * シーンを更新する際の処理
	 * @returns
	 */
	public async updateScene(): Promise<void> {
		return Promise.resolve();
	}

	/**
	 * シーンを停止する際の処理
	 * @returns
	 */
	public async stopScene(): Promise<void> {
		return Promise.resolve();
	}
}
