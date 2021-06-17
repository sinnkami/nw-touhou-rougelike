import loki from "lokijs";
import Const from "../class/Const";
import dbJson from "../../database/db.json";
import ErrorManager, { ErrorCode } from "../class/ErrorManager";

const db = new loki("");
db.loadJSON(JSON.stringify(dbJson));

export default class LokiJs {
	public static getAll(collectionName: string): Promise<any> {
		const collection = db.getCollection(collectionName);
		if (!collection) {
			return Promise.reject(ErrorManager.getError(ErrorCode.CollectionNotFound, collectionName));
		}

		const values = collection.find();
		return Promise.resolve(values);
	}
}
