import { IDataBossMessages } from "../../definitions/class/Data/IDataBossMessages";
import Data_Base from "./Data_Base";

// コレクション名
const COLLECTION_NAME = "boss_messages";

/**
 * ボス戦前の会話を保持するクラス
 */
export default class Data_BossMessages extends Data_Base {
	private bossMessagesInfoList: IDataBossMessages[] = [];

	public async init(): Promise<void> {
		this.bossMessagesInfoList = [];
	}

	public async load(): Promise<void> {
		this.init();
		const list = await super.load(COLLECTION_NAME);
		this.bossMessagesInfoList = list as IDataBossMessages[];
	}

	public getAll(): IDataBossMessages[] {
		return this.bossMessagesInfoList;
	}

	public get(id: string): IDataBossMessages | undefined {
		return this.bossMessagesInfoList.find(v => v.bossMessagesId === id);
	}
}
