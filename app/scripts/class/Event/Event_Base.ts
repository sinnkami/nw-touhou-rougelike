/**
 * イベント汎用クラス
 */
export class Event_Base {
	/**
	 * イベントを実行
	 * @returns
	 */
	public async execute(): Promise<void> {
		return Promise.resolve();
	}
}
