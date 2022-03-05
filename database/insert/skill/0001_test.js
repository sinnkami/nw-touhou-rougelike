const path = require("path");

const COLLECTION_NAME = path.basename(__filename, path.extname(__filename));
const ID = "0001";

module.exports = function (db) {
	return new Promise((resolve) => {
		const DB = db.getCollection("skill");

		DB.findAndRemove({ skillId: { '$eq': ID } });

		const value = {
			skillId: ID,
			name: "テストスキル",
			type: "AttackMultiplication",
			param: 2,
		};


		DB.insert(value);
		return resolve(`insert to ${COLLECTION_NAME} : ${ID} ok`);
	})
}