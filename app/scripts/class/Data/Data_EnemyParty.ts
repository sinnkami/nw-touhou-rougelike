import { IDataEnemyParty } from "../../definitions/class/Data/IDataEnemyParty";
import clone from "../../modules/utils/clone";
import Data_Base from "./Data_Base";

// コレクション名
const COLLECTION_NAME = "enemy_party";

/**
 * エンカウント情報を保持するクラス
 */
export default class Data_EnemyParty extends Data_Base {
	private enemyPartyInfoList: IDataEnemyParty[] = [];

	public async init(): Promise<void> {
		this.enemyPartyInfoList = [];
	}

	public async load(): Promise<void> {
		this.init();
		const list = await super.load(COLLECTION_NAME);
		this.enemyPartyInfoList = list as IDataEnemyParty[];
	}

	public getAll(): IDataEnemyParty[] {
		return this.enemyPartyInfoList;
	}

	public get(id: string): IDataEnemyParty | undefined {
		const value = this.enemyPartyInfoList.find(v => v.enemyPartyId === id);
		if (!value) return undefined;
		return clone(value) as IDataEnemyParty;
	}
}
