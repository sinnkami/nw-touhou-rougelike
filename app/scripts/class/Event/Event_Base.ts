import LoadManager from "../Manager/LoadManager";

/**
 * イベント汎用クラス
 */
export class Event_Base {
	public get name(): string {
		return this.constructor.name;
	}
	/**
	 * イベントを実行
	 * @returns
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async execute(...values: unknown[]): Promise<boolean> {
		if (LoadManager.isLoading) {
			return false;
		}
		await LoadManager.start(this.name);
		return true;
	}
}
