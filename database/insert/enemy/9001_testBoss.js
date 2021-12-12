const path = require("path");

const COLLECTION_NAME = path.basename(__filename, path.extname(__filename));
const ID = "9001";

module.exports = function (db) {
	return new Promise((resolve) => {
		const DB = db.getCollection("enemy");

		DB.findAndRemove({ enemyGroupId: { '$eq': ID } });

		const value = {
			enemyGroupId: ID,
			enemyId: ID,
			name: "ボスアクピー",
			portraitPath: "assets/images/enemy/akpy.jpg",
			hp: 300,
			mp: 99999,
			attack: 10,
			defense: 10,
			magical: 10,
			agility: 50,
			dexterity: 10,
		};


		DB.insert(value);
		return resolve(`insert to ${COLLECTION_NAME} : ${ID} ok`);
	})
}