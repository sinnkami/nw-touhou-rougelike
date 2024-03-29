import Data_Boss from "../Data/Data_Boss";
import Data_Character from "../Data/Data_Character";
import Data_Dungeon from "../Data/Data_Dungeon";
import Data_Enemy from "../Data/Data_Enemy";
import Data_EnemyParty from "../Data/Data_EnemyParty";
import Data_ExpTable from "../Data/Data_ExpTable";
import Data_Skill from "../Data/Data_Skill";

/**
 * DB情報を管理するクラス
 */
export default class DataManager {
	// 各クラス
	public static dungeon: Data_Dungeon = new Data_Dungeon();
	public static character: Data_Character = new Data_Character();
	public static enemy: Data_Enemy = new Data_Enemy();
	public static enemyParty: Data_EnemyParty = new Data_EnemyParty();
	public static boss: Data_Boss = new Data_Boss();
	public static expTable: Data_ExpTable = new Data_ExpTable();
	public static skill: Data_Skill = new Data_Skill();

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
			this.boss.load(),
			this.expTable.load(),
			this.skill.load(),
		]).then();
	}
}
