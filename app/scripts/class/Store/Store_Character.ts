import { IStoreCharacter } from "../../definitions/class/Store/IStoreCharacter";
import Store_Base from "./Store_Base";

/**
 * 現在所持しているキャラ全体の情報を一括で管理するクラス
 */
export default class Store_Character extends Store_Base {
	// ストアIdを採番するための値
	private storeNum: number = 0;

	// キャラリスト
	private characterList: IStoreCharacter[] = [];

	public async init(): Promise<void> {
		this.characterList = [];
		this.storeNum = 0;
	}

	public async load(list: IStoreCharacter[]): Promise<void> {
		await super.load(list);
		this.characterList = list as IStoreCharacter[];
	}

	public getAll(): IStoreCharacter[] {
		return this.characterList;
	}

	public get(id: string): IStoreCharacter | undefined {
		return this.characterList.find(v => v.storeId === id);
	}

	public add(...characters: IStoreCharacter[]): void {
		this.characterList = this.characterList.concat(characters);
	}

	public remove(id: string): void {
		this.characterList = this.characterList.filter(v => v.storeId !== id);
	}

	/**
	 * 新しいStoreIdを採番し返す
	 * @returns
	 */
	public createNewStoreId(): string {
		this.storeNum += 1;
		return this.storeNum.toString();
	}
}
