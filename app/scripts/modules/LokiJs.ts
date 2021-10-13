import loki from "lokijs";
import dbJson from "../../database/db.json";
import ErrorManager, { ErrorCode } from "../class/Manager/ErrorManager";

const db = new loki("");
db.loadJSON(JSON.stringify(dbJson));

/**
 * インメモリデータベースの処理を行うクラス
 */
export default class LokiJs {
	public static getAll(collectionName: string): Promise<unknown> {
		const collection = db.getCollection(collectionName);
		if (!collection) {
			return Promise.reject(ErrorManager.getError(ErrorCode.CollectionNotFound, collectionName));
		}

		const values = collection.find();
		return Promise.resolve(values);
	}
}
