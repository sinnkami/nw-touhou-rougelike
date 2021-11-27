const path = require("path");

const COLLECTION_NAME = path.basename(__filename, path.extname(__filename));
const ID = "0001";

module.exports = function (db) {
	return new Promise((resolve) => {
		const DB = db.getCollection("boss_messages");

		DB.findAndRemove({ bossMessagesId: { '$eq': ID } });

		const value = {
			bossMessagesId: ID, 
			enemyPartyId: "9001",
			backgroundImagePath: "assets/images/background/bossMessgaes/test/background.jpg",
			messages: [
				{
					characterId: "0009",
					message: "テスト",
				},
				{
					characterId: "0009",
					message: "メッセージ2",
				},
				{
					characterId: "0009",
					message: "ABC",
				},
				{
					characterId: "0009",
					message: "漢字",
				},
				{
					characterId: "0009",
					message: "テスト・テスト・テスト・テスト・テスト・テスト・テスト・テスト・テスト・テスト・テスト・テスト・テスト・テスト・テスト・テスト・テスト・テスト・テスト・テスト",
				}
				
			]
		};


		DB.insert(value);
		return resolve(`insert to ${COLLECTION_NAME} : ${ID} ok`);
	})
}