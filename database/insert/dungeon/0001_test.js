const path = require("path");

const COLLECTION_NAME = path.basename(__filename, path.extname(__filename));
const ID = "0001";

module.exports = function (db) {
	return new Promise((resolve) => {
		const DB = db.getCollection("dungeon");

		DB.findAndRemove({ mapId: { '$eq': ID } });

		const value = {
			mapId: ID,
			name: "テストダンジョン",
		};


		DB.insert(value);
		return resolve(`insert to ${COLLECTION_NAME} : ${ID} ok`);
	})
}