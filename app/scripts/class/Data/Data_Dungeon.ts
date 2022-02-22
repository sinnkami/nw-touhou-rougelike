import { IDataDungeon } from "../../definitions/class/Data/IDataDungeon";
import Data_Base from "./Data_Base";

// コレクション名
const COLLECTION_NAME = "dungeon";

/**
 * マップ情報を保持するクラス
 */
export default class Data_Dungeon extends Data_Base {
	private dungeonInfoList: IDataDungeon[] = [];

	public async init(): Promise<void> {
		this.dungeonInfoList.length = 0;
	}

	public async load(): Promise<void> {
		this.init();
		const list = await super.load(COLLECTION_NAME);
		this.dungeonInfoList = list as IDataDungeon[];
	}

	public getAll(): IDataDungeon[] {
		return this.dungeonInfoList;
	}

	public get(id: string): IDataDungeon | undefined {
		return this.dungeonInfoList.find(v => v.dungeonId === id);
	}
}
