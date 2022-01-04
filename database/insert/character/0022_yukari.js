const path = require("path");

const COLLECTION_NAME = path.basename(__filename, path.extname(__filename));
const ID = "0022";

module.exports = function (db) {
	return new Promise((resolve) => {
		const DB = db.getCollection("character");

		DB.findAndRemove({ characterId: { '$eq': ID } });

		const value = {
			characterId: ID,
			name: "紫",
			fullName: "八雲 紫",
			level: 1,
			exp: 0,
			growthType: "Late",
			charaChipPath: "assets/images/charaChip/yukari.png",
			portraitPath: "assets/images/portrait/test.png",
			initStatus: {
				hp: 300,
				mp: 200,
				attack: 50,
				defense: 50,
				magical: 50,
				agility: 50,
				dexterity: 50,
			},
			maxStatus: {
				hp: 300,
				mp: 200,
				attack: 50,
				defense: 50,
				magical: 50,
				agility: 50,
				dexterity: 50,
			},
		};


		DB.insert(value);
		return resolve(`insert to ${COLLECTION_NAME} : ${ID} ok`);
	})
}