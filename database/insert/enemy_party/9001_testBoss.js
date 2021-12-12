const path = require("path");

const COLLECTION_NAME = path.basename(__filename, path.extname(__filename));
const ID = "9001";

module.exports = function (db) {
	return new Promise((resolve) => {
		const DB = db.getCollection("enemy_party");

		DB.findAndRemove({ enemyPartyId: { '$eq': ID } });

		const value = {
			enemyPartyId: ID,
			enemyList: ["9001"],
			rate: 100,
		};


		DB.insert(value);
		return resolve(`insert to ${COLLECTION_NAME} : ${ID} ok`);
	})
}