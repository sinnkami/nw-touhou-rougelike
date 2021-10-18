import Data_Character from "../Data/Data_Character";
import Data_Dungeon from "../Data/Data_Dungeon";
import Data_Enemy from "../Data/Data_Enemy";
import Data_EnemyGroup from "../Data/Data_EnemyGroup";

/**
 * DB情報を管理するクラス
 */
export default class DataManager {
	// 各クラス
	public static dungeon: Data_Dungeon = new Data_Dungeon();
	public static character: Data_Character = new Data_Character();
	public static enemy: Data_Enemy = new Data_Enemy();
	public static enemyGroup: Data_EnemyGroup = new Data_EnemyGroup();

	/**
	 * 初期化処理
	 * @returns
	 */
	public static init(): Promise<void> {
		return Promise.all([
			this.dungeon.load(),
			this.character.load(),
			this.enemy.load(),
			this.enemyGroup.load(),
		]).then();
	}
}
