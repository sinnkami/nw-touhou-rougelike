import { IDataEnemyGroup } from "../../definitions/class/Data/IDataEnemyGroup";
import clone from "../../modules/utils/clone";
import Data_Base from "./Data_Base";

// コレクション名
const COLLECTION_NAME = "enemy_group";

/**
 * エンカウント情報を保持するクラス
 */
export default class Data_EnemyGroup extends Data_Base {
	private enemyGroupInfoList: IDataEnemyGroup[] = [];

	public async init(): Promise<void> {
		this.enemyGroupInfoList = [];
	}

	public async load(): Promise<void> {
		this.init();
		const list = await super.load(COLLECTION_NAME);
		this.enemyGroupInfoList = list as IDataEnemyGroup[];
	}

	public getAll(): IDataEnemyGroup[] {
		return this.enemyGroupInfoList;
	}

	public get(id: string): IDataEnemyGroup | undefined {
		const value = this.enemyGroupInfoList.find(v => v.enemyGroupId === id);
		if (!value) return undefined;
		return clone(value) as IDataEnemyGroup;
	}
}
