import { IStoreParty } from "../../definitions/class/Store/IStoreParty";
import Store_Base from "./Store_Base";

// 最大人数
// TODO: 定義場所の変更
const LIMIT_MENBER = 3;

/**
 * 現在のパーティメンバーを管理するクラス
 */
export default class Store_Party extends Store_Base {
	// メンバーリスト
	private menberList: IStoreParty[] = [];

	public async init(): Promise<void> {
		this.menberList = [];
	}

	public async load(): Promise<void> {
		this.init();
		const list = await super.load();
		this.menberList = list as IStoreParty[];
	}

	public getAll(): IStoreParty[] {
		return this.menberList;
	}

	public get(id: string): IStoreParty | undefined {
		return this.menberList.find(v => v.characterId === id);
	}

	public add(...partys: IStoreParty[]): void {
		// TODO: エラーにするかは悩みどころ
		// MEMO: キャッチさせてしょりったほうがよいかなぁ・・・？
		if (partys.length + this.menberList.length >= LIMIT_MENBER) return;
		this.menberList = this.menberList.concat(partys);
	}
}
