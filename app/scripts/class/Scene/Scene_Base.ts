/**
 * シーン汎用クラス
 */
export default class Scene_Base {
	// TODO: 要らないかもしれない
	/** シーンのクラス名 */
	public get name(): string {
		return this.constructor.name;
	}

	/**
	 * シーンを開始する際の処理
	 * @returns
	 */
	public startScene(): void {
		return;
	}

	/**
	 * シーンを更新する際の処理
	 * @returns
	 */
	public updateScene(): void {
		return;
	}

	/**
	 * シーンを停止する際の処理
	 * @returns
	 */
	public stopScene(): void {
		return;
	}
}
