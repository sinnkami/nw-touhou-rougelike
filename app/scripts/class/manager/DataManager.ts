import Data_Dungeon from "../Data/Data_Dungeon";

/**
 * DB情報を管理するクラス
 */
export default class DataManager {
	// 各クラス
	public static dungeon: Data_Dungeon = new Data_Dungeon();

	/**
	 * 初期化処理
	 * @returns
	 */
	public static init(): Promise<void> {
		return Promise.all([this.dungeon.load()]).then();
	}
}
