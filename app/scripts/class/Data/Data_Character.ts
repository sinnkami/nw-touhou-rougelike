import { IDataCharacter } from "../../definitions/class/Data/IDataCharacter";
import Data_Base from "./Data_Base";

// コレクション名
const COLLECTION_NAME = "character";

/**
 * キャラ情報を保持するクラス
 */
export default class Data_Character extends Data_Base {
	private characterInfoList: IDataCharacter[] = [];

	public async init(): Promise<void> {
		this.characterInfoList.length = 0;
	}

	public async load(): Promise<void> {
		this.init();
		const list = await super.load(COLLECTION_NAME);
		this.characterInfoList = list as IDataCharacter[];
	}

	public getAll(): IDataCharacter[] {
		return this.characterInfoList;
	}

	public get(id: string): IDataCharacter | undefined {
		return this.characterInfoList.find(v => v.characterId === id);
	}
}
