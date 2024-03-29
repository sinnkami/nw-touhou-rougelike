const path = require("path");

const COLLECTION_NAME = path.basename(__filename, path.extname(__filename));
const ID = "0001";

module.exports = function (db) {
	return new Promise((resolve) => {
		const DB = db.getCollection("dungeon");

		DB.findAndRemove({ dungeonId: { '$eq': ID } });

		const value = {
			dungeonId: ID,
			bossId: "0001",
			maxHierarchy: 3,
			name: "テストダンジョン",
		};


		DB.insert(value);
		return resolve(`insert to ${COLLECTION_NAME} : ${ID} ok`);
	})
}