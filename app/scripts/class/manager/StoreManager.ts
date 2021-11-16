import Store_Battle from "../Store/Store_Battle";
import Store_Character from "../Store/Store_Character";
import Store_Dungeon from "../Store/Store_Dungeon";
import Store_EnemyParty from "../Store/Store_EnemyParty";
import Store_Party from "../Store/Store_Party";

/**
 * セーブデータの情報を管理するクラス
 */
export default class StoreManager {
	// 各クラス
	public static character: Store_Character = new Store_Character();
	public static party: Store_Party = new Store_Party();
	public static enemyParty: Store_EnemyParty = new Store_EnemyParty();
	public static battle: Store_Battle = new Store_Battle();
	public static dungeon: Store_Dungeon = new Store_Dungeon();

	/**
	 * 初期化処理
	 * @returns
	 */
	public static init(): Promise<void> {
		return Promise.all([
			this.character.init(),
			this.party.init(),
			this.enemyParty.init(),
			this.battle.init(),
		]).then();
	}
	//TODO: セーブデータロード処理
	// return Promise.all([this.character.load()]).then();
}
