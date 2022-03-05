import { IDataSkill } from "../../definitions/class/Data/IDataSkill";
import Data_Base from "./Data_Base";

// コレクション名
const COLLECTION_NAME = "skill";

/**
 * スキル情報を保持するクラス
 */
export default class Data_Skill extends Data_Base {
	private expTableInfoList: IDataSkill[] = [];

	public async init(): Promise<void> {
		this.expTableInfoList.length = 0;
	}

	public async load(): Promise<void> {
		this.init();
		const list = await super.load(COLLECTION_NAME);
		this.expTableInfoList = list as IDataSkill[];
	}

	public getAll(): IDataSkill[] {
		return this.expTableInfoList;
	}

	public get(id: string): IDataSkill | undefined {
		return this.expTableInfoList.find(v => v.skillId === id);
	}
}
