import { IStoreCharacter } from "../../definitions/class/Store/IStoreCharacter";
import Store_Base from "./Store_Base";

/**
 * 現在所持しているキャラ全体の情報を一括で管理するクラス
 */
export default class Store_Character extends Store_Base {
	// キャラリスト
	private characterList: IStoreCharacter[] = [];

	public async init(): Promise<void> {
		this.characterList = [];
	}

	public async load(): Promise<void> {
		this.init();
		const list = await super.load();
		this.characterList = list as IStoreCharacter[];
	}

	public getAll(): IStoreCharacter[] {
		return this.characterList;
	}

	public get(id: string): IStoreCharacter | undefined {
		return this.characterList.find(v => v.characterId === id);
	}

	public add(...characters: IStoreCharacter[]): void {
		this.characterList = this.characterList.concat(characters);
	}
}
