import { IDataBoss } from "../../definitions/class/Data/IDataBoss";
import Data_Base from "./Data_Base";

// コレクション名
const COLLECTION_NAME = "boss";

/**
 * ボス戦前の会話を保持するクラス
 */
export default class Data_Boss extends Data_Base {
	private bossInfoList: IDataBoss[] = [];

	public async init(): Promise<void> {
		this.bossInfoList = [];
	}

	public async load(): Promise<void> {
		this.init();
		const list = await super.load(COLLECTION_NAME);
		this.bossInfoList = list as IDataBoss[];
	}

	public getAll(): IDataBoss[] {
		return this.bossInfoList;
	}

	public get(id: string): IDataBoss | undefined {
		return this.bossInfoList.find(v => v.bossId === id);
	}
}
