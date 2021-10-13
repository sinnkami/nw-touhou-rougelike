/**
 * 現在実行中のゲーム内で保存する必要がある情報を管理する汎用クラス
 */
export default class Store_Base {
	public async init(): Promise<void> {
		return;
	}

	public async load(): Promise<unknown> {
		// TODO: セーブデータからの復帰処理
		return Promise.resolve();
	}

	// TODO: 方だけ定義したい
	// public async get(id: string): Promise<any> {
	// 	return;
	// }
}
