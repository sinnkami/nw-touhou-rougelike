import { ILoadResourceInfo } from "../../definitions/class/Manager/IResourceManager";
import LoadManager from "../Manager/LoadManager";
import ResourceManager from "../Manager/ResourceManager";

/**
 * イベント汎用クラス
 */
export class Event_Base {
	// クラス名
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

	/**
	 * リソースを読み込む
	 * @param resourceInfoList
	 * @returns
	 */
	protected async loadResources(...resourceInfoList: ILoadResourceInfo[]): Promise<void> {
		return ResourceManager.loadResources(...resourceInfoList);
	}
}
