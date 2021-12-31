const path = require("path");

const COLLECTION_NAME = path.basename(__filename, path.extname(__filename));
const ID = "0001";

module.exports = function (db) {
	return new Promise((resolve) => {
		const DB = db.getCollection("enemy");

		DB.findAndRemove({ enemyId: { '$eq': ID } });

		const value = {
			enemyId: ID,
			name: "アクピー",
			level: 1,
			exp: 100,
			growthType: "Late",
			portraitPath: "assets/images/enemy/akpy.jpg",
			initStatus: {
				hp: 300,
				mp: 99999,
				attack: 10,
				defense: 10,
				magical: 10,
				agility: 50,
				dexterity: 10,
			},
			maxStatus: {
				hp: 300,
				mp: 99999,
				attack: 10,
				defense: 10,
				magical: 10,
				agility: 50,
				dexterity: 10,
			},
		};

		DB.insert(value);
		return resolve(`insert to ${COLLECTION_NAME} : ${ID} ok`);
	})
}