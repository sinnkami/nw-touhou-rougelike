import { IStorePartyDict } from "../../definitions/class/Store/IStoreParty";
import Actor from "../../modules/field/Actor";
import Store_Base from "./Store_Base";

// 最大人数
// TODO: 定義場所の変更
const LIMIT_MENBER = 3;

/**
 * 現在のパーティメンバーを管理するクラス
 */
export default class Store_Party extends Store_Base {
	// メンバー一覧
	private menberDict: IStorePartyDict = {};

	private get size(): number {
		return Object.values(this.menberDict).length;
	}

	public async init(): Promise<void> {
		this.menberDict = {};
	}

	public async load(): Promise<void> {
		this.init();
		const dict = await super.load();
		this.menberDict = dict as IStorePartyDict;
	}

	public getAll(): IStorePartyDict {
		return this.menberDict;
	}

	public get(id: string): Actor | undefined {
		return this.menberDict[id];
	}

	public add(...partys: Actor[]): void {
		// TODO: エラーにするかは悩みどころ
		// MEMO: キャッチさせてしょりったほうがよいかなぁ・・・？
		if (partys.length + this.size > LIMIT_MENBER) throw new Error("パーティ上限を超えて追加しようとしました");
		partys.forEach(v => {
			this.menberDict[this.size] = v;
		});
	}
}
