const path = require("path");

const COLLECTION_NAME = path.basename(__filename, path.extname(__filename));

module.exports = function (db) {
	return new Promise((resolve) => {
		db.addCollection(COLLECTION_NAME);
		return resolve(`${COLLECTION_NAME}: ok`);
	})
}