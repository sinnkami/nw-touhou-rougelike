const path = require("path");

const COLLECTION_NAME = path.basename(__filename, path.extname(__filename));
const MAP_ID = "0001";

module.exports = function (db) {
	return new Promise((resolve) => {
		const mapDB = db.getCollection("map");

		mapDB.findAndRemove({ mapId: { '$eq': MAP_ID } });

		const map = {
			mapId: MAP_ID,
			name: "デバッグルーム",
			baseMap: [],
			eventMap: [],
			mapChipPath: "assets/images/map/chip.png",
		};

		[
			["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "road", "wall"],
			["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
		].forEach((value, y) => {
			value.forEach((mapChip, x) => {
				const mapData = {
					x,
					y,
					mapChip,
				};

				map.baseMap.push(mapData);
			})
		});

		mapDB.insert(map);
		return resolve(`insert to ${ COLLECTION_NAME } : ${MAP_ID} ok`);
	})
}