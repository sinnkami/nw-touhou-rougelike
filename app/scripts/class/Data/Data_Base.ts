import LokiJs from "../../modules/LokiJs";

/**
 * lokijsとのデータのやり取りを行い、情報を保持する汎用クラス
 */
export default class Data_Base {
	public async init(): Promise<void> {
		return;
	}

	public async load(collectionName: string): Promise<any> {
		return LokiJs.getAll(collectionName);
	}

	// TODO: 方だけ定義したい
	// public async get(id: string): Promise<any> {
	// 	return;
	// }
}
