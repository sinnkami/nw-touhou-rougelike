import LoadManager from "../manager/LoadManager";

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
	public async execute(...values: any[]): Promise<boolean> {
		if (LoadManager.isLoading) {
			return false;
		}
		await LoadManager.start(this.name);
		return true;
	}
}
