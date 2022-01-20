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
	private menberList: Actor[] = [];

	private get size(): number {
		return this.menberList.length;
	}

	public async init(): Promise<void> {
		this.menberList = [];
	}

	public async load(list: Actor[]): Promise<void> {
		await super.load(list);

		// MEMO: JSONにすると算出プロパティなどが無くなるので再生成
		this.menberList = list.map(actor => new Actor(actor));
	}

	public getAll(): Actor[] {
		return this.menberList;
	}

	public get(id: string): Actor | undefined {
		return this.menberList.find(v => v.characterId === id);
	}

	public add(...partys: Actor[]): void {
		// TODO: エラーにするかは悩みどころ
		// MEMO: キャッチさせてしょりったほうがよいかなぁ・・・？
		if (partys.length + this.size > LIMIT_MENBER) throw new Error("パーティ上限を超えて追加しようとしました");
		this.menberList = this.menberList.concat(partys);
	}

	public remove(actor: Actor): void {
		this.menberList = this.menberList.filter(v => v.storeId !== actor.storeId);
	}
}
