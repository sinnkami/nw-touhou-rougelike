import Data_Character from "../Data/Data_Character";
import Data_Dungeon from "../Data/Data_Dungeon";

/**
 * DB情報を管理するクラス
 */
export default class DataManager {
	// 各クラス
	public static dungeon: Data_Dungeon = new Data_Dungeon();
	public static character: Data_Character = new Data_Character();

	/**
	 * 初期化処理
	 * @returns
	 */
	public static init(): Promise<void> {
		return Promise.all([this.dungeon.load(), this.character.load()]).then();
	}
}
