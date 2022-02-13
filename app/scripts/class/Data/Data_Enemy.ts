import { IDataEnemy } from "../../definitions/class/Data/IDataEnemy";
import clone from "../../modules/utils/clone";
import Data_Base from "./Data_Base";

// コレクション名
const COLLECTION_NAME = "enemy";

/**
 * エネミー情報を保持するクラス
 */
export default class Data_Enemy extends Data_Base {
	private enemyInfoList: IDataEnemy[] = [];

	public async init(): Promise<void> {
		this.enemyInfoList = [];
	}

	public async load(): Promise<void> {
		this.init();
		const list = await super.load(COLLECTION_NAME);
		this.enemyInfoList = list as IDataEnemy[];
	}

	public getAll(): IDataEnemy[] {
		return this.enemyInfoList;
	}

	public get(id: string): IDataEnemy | undefined {
		const value = this.enemyInfoList.find(v => v.enemyId === id);
		if (!value) return undefined;
		return clone(value);
	}
}
