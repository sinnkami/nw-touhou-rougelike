import { IDataExpTable } from "../../definitions/class/Data/IDataExpTable";
import Data_Base from "./Data_Base";

// コレクション名
const COLLECTION_NAME = "exp_table";

/**
 * マップ情報を保持するクラス
 */
export default class Data_ExpTable extends Data_Base {
	private expTableInfoList: IDataExpTable[] = [];

	public async init(): Promise<void> {
		this.expTableInfoList.length = 0;
	}

	public async load(): Promise<void> {
		this.init();
		const list = await super.load(COLLECTION_NAME);
		this.expTableInfoList = list as IDataExpTable[];
	}

	public getAll(): IDataExpTable[] {
		return this.expTableInfoList;
	}

	public get(id: string, level: number): IDataExpTable | undefined {
		return this.expTableInfoList.find(v => v.expTableId === id && v.level === level);
	}
}
