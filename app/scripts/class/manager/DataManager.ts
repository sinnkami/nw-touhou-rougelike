import Data_Character from "../Data/Data_Character";
import Data_Dungeon from "../Data/Data_Dungeon";
import Data_Enemy from "../Data/Data_Enemy";
import Data_EnemyParty from "../Data/Data_EnemyParty";

/**
 * DB情報を管理するクラス
 */
export default class DataManager {
	// 各クラス
	public static dungeon: Data_Dungeon = new Data_Dungeon();
	public static character: Data_Character = new Data_Character();
	public static enemy: Data_Enemy = new Data_Enemy();
	public static enemyParty: Data_EnemyParty = new Data_EnemyParty();

	/**
	 * 初期化処理
	 * @returns
	 */
	public static init(): Promise<void> {
		return Promise.all([
			this.dungeon.load(),
			this.character.load(),
			this.enemy.load(),
			this.enemyParty.load(),
		]).then();
	}
}
