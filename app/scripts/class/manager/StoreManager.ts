import Data_Character from "../Data/Data_Character";
import Data_Dungeon from "../Data/Data_Dungeon";
import Store_Character from "../Store/Store_Character";
import Store_Party from "../Store/Store_Party";

/**
 * セーブデータの情報を管理するクラス
 */
export default class StoreManager {
	// 各クラス
	public static character: Store_Character = new Store_Character();
	public static party: Store_Party = new Store_Party();

	/**
	 * 初期化処理
	 * @returns
	 */
	public static init(): Promise<void> {
		return Promise.resolve();
	}
	//TODO: セーブデータロード処理
	// return Promise.all([this.character.load()]).then();
}
