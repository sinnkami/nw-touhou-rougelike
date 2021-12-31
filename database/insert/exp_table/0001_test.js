const path = require("path");

const COLLECTION_NAME = path.basename(__filename, path.extname(__filename));
const ID = "0001";

module.exports = function (db) {
	return new Promise((resolve) => {
		const DB = db.getCollection("exp_table");

		DB.findAndRemove({ expTableId: { '$eq': ID } });
		DB.insert({
			expTableId: ID,
			level: 1,
			exp: 0,
		});
		DB.insert({
			expTableId: ID,
			level: 2,
			exp: 14,
		});
		DB.insert({
			expTableId: ID,
			level: 3,
			exp: 40,
		});
		DB.insert({
			expTableId: ID,
			level: 4,
			exp: 74,
		});
		DB.insert({
			expTableId: ID,
			level: 5,
			exp: 114,
		});
		DB.insert({
			expTableId: ID,
			level: 6,
			exp: 159,
		});
		DB.insert({
			expTableId: ID,
			level: 7,
			exp: 209,
		});
		DB.insert({
			expTableId: ID,
			level: 8,
			exp: 264,
		});
		DB.insert({
			expTableId: ID,
			level: 9,
			exp: 322,
		});
		DB.insert({
			expTableId: ID,
			level: 10,
			exp: 385,
		});
		DB.insert({
			expTableId: ID,
			level: 11,
			exp: 450,
		});
		DB.insert({
			expTableId: ID,
			level: 12,
			exp: 520,
		});
		DB.insert({
			expTableId: ID,
			level: 13,
			exp: 592,
		});
		DB.insert({
			expTableId: ID,
			level: 14,
			exp: 668,
		});
		DB.insert({
			expTableId: ID,
			level: 15,
			exp: 746,
		});
		DB.insert({
			expTableId: ID,
			level: 16,
			exp: 827,
		});
		DB.insert({
			expTableId: ID,
			level: 17,
			exp: 911,
		});
		DB.insert({
			expTableId: ID,
			level: 18,
			exp: 998,
		});
		DB.insert({
			expTableId: ID,
			level: 19,
			exp: 1088,
		});
		DB.insert({
			expTableId: ID,
			level: 20,
			exp: 1179,
		});
		DB.insert({
			expTableId: ID,
			level: 21,
			exp: 1274,
		});
		DB.insert({
			expTableId: ID,
			level: 22,
			exp: 1371,
		});
		DB.insert({
			expTableId: ID,
			level: 23,
			exp: 1470,
		});
		DB.insert({
			expTableId: ID,
			level: 24,
			exp: 1571,
		});
		DB.insert({
			expTableId: ID,
			level: 25,
			exp: 1674,
		});
		DB.insert({
			expTableId: ID,
			level: 26,
			exp: 1780,
		});
		DB.insert({
			expTableId: ID,
			level: 27,
			exp: 1888,
		});
		DB.insert({
			expTableId: ID,
			level: 28,
			exp: 1998,
		});
		DB.insert({
			expTableId: ID,
			level: 29,
			exp: 2110,
		});
		DB.insert({
			expTableId: ID,
			level: 30,
			exp: 2224,
		});
		DB.insert({
			expTableId: ID,
			level: 31,
			exp: 2340,
		});
		DB.insert({
			expTableId: ID,
			level: 32,
			exp: 2458,
		});
		DB.insert({
			expTableId: ID,
			level: 33,
			exp: 2578,
		});
		DB.insert({
			expTableId: ID,
			level: 34,
			exp: 2700,
		});
		DB.insert({
			expTableId: ID,
			level: 35,
			exp: 2823,
		});
		DB.insert({
			expTableId: ID,
			level: 36,
			exp: 2949,
		});
		DB.insert({
			expTableId: ID,
			level: 37,
			exp: 3076,
		});
		DB.insert({
			expTableId: ID,
			level: 38,
			exp: 3205,
		});
		DB.insert({
			expTableId: ID,
			level: 39,
			exp: 3336,
		});
		DB.insert({
			expTableId: ID,
			level: 40,
			exp: 3469,
		});
		DB.insert({
			expTableId: ID,
			level: 41,
			exp: 3603,
		});
		DB.insert({
			expTableId: ID,
			level: 42,
			exp: 3739,
		});
		DB.insert({
			expTableId: ID,
			level: 43,
			exp: 3876,
		});
		DB.insert({
			expTableId: ID,
			level: 44,
			exp: 4016,
		});
		DB.insert({
			expTableId: ID,
			level: 45,
			exp: 4157,
		});
		DB.insert({
			expTableId: ID,
			level: 46,
			exp: 4299,
		});
		DB.insert({
			expTableId: ID,
			level: 47,
			exp: 4443,
		});
		DB.insert({
			expTableId: ID,
			level: 48,
			exp: 4589,
		});
		DB.insert({
			expTableId: ID,
			level: 49,
			exp: 4736,
		});
		DB.insert({
			expTableId: ID,
			level: 50,
			exp: 4885,
		});
		DB.insert({
			expTableId: ID,
			level: 51,
			exp: 5035,
		});
		DB.insert({
			expTableId: ID,
			level: 52,
			exp: 5187,
		});
		DB.insert({
			expTableId: ID,
			level: 53,
			exp: 5340,
		});
		DB.insert({
			expTableId: ID,
			level: 54,
			exp: 5495,
		});
		DB.insert({
			expTableId: ID,
			level: 55,
			exp: 5651,
		});
		DB.insert({
			expTableId: ID,
			level: 56,
			exp: 5809,
		});
		DB.insert({
			expTableId: ID,
			level: 57,
			exp: 5968,
		});
		DB.insert({
			expTableId: ID,
			level: 58,
			exp: 6129,
		});
		DB.insert({
			expTableId: ID,
			level: 59,
			exp: 6291,
		});
		DB.insert({
			expTableId: ID,
			level: 60,
			exp: 6454,
		});
		DB.insert({
			expTableId: ID,
			level: 61,
			exp: 6619,
		});
		DB.insert({
			expTableId: ID,
			level: 62,
			exp: 6785,
		});
		DB.insert({
			expTableId: ID,
			level: 63,
			exp: 6953,
		});
		DB.insert({
			expTableId: ID,
			level: 64,
			exp: 7121,
		});
		DB.insert({
			expTableId: ID,
			level: 65,
			exp: 7292,
		});
		DB.insert({
			expTableId: ID,
			level: 66,
			exp: 7463,
		});
		DB.insert({
			expTableId: ID,
			level: 67,
			exp: 7636,
		});
		DB.insert({
			expTableId: ID,
			level: 68,
			exp: 7810,
		});
		DB.insert({
			expTableId: ID,
			level: 69,
			exp: 7986,
		});
		DB.insert({
			expTableId: ID,
			level: 70,
			exp: 8163,
		});
		DB.insert({
			expTableId: ID,
			level: 71,
			exp: 8341,
		});
		DB.insert({
			expTableId: ID,
			level: 72,
			exp: 8520,
		});
		DB.insert({
			expTableId: ID,
			level: 73,
			exp: 8701,
		});
		DB.insert({
			expTableId: ID,
			level: 74,
			exp: 8883,
		});
		DB.insert({
			expTableId: ID,
			level: 75,
			exp: 9066,
		});
		DB.insert({
			expTableId: ID,
			level: 76,
			exp: 9250,
		});
		DB.insert({
			expTableId: ID,
			level: 77,
			exp: 9436,
		});
		DB.insert({
			expTableId: ID,
			level: 78,
			exp: 9623,
		});
		DB.insert({
			expTableId: ID,
			level: 79,
			exp: 9811,
		});
		DB.insert({
			expTableId: ID,
			level: 80,
			exp: 10000,
		});

		return resolve(`insert to ${COLLECTION_NAME} : ${ID} ok`);
	})
}