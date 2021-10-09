const path = require("path");

const COLLECTION_NAME = path.basename(__filename, path.extname(__filename));
const ID = "0001";

module.exports = function (db) {
	return new Promise((resolve) => {
		const DB = db.getCollection("character");

		DB.findAndRemove({ characterId: { '$eq': ID } });

		const value = {
			characterId: ID,
			firstName: "霊夢",
			familyName: "博麗",
			delimiter: " ",
			charaChipPath: "assets/images/charaChip/reimu.png",
			portraitPath: "assets/images/portrait/reimu/normal.png",
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