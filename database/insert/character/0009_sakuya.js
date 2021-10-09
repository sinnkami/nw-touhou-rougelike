const path = require("path");

const COLLECTION_NAME = path.basename(__filename, path.extname(__filename));
const ID = "0009";

module.exports = function (db) {
	return new Promise((resolve) => {
		const DB = db.getCollection("character");

		DB.findAndRemove({ characterId: { '$eq': ID } });

		const value = {
			characterId: ID,
			firstName: "咲夜",
			familyName: "十六夜",
			delimiter: " ",
			charaChipPath: "assets/images/charaChip/sakuya.png",
			portraitPath: "assets/images/portrait/sakuya/normal.png",
			hp: 300,
			mp: 200,
			attack: 50,
			defense: 50,
			magical: 50,
			agility: 50,
			dexterity: 50,
		};


		DB.insert(value);
		return resolve(`insert to ${COLLECTION_NAME} : ${ID} ok`);
	})
}