const requireDir = require("require-dir");
const path = require("path")

const FILE_NAME = "../app/database/db.json";
const loki = require("lokijs");
console.log(path.resolve(__dirname, FILE_NAME));
const db = new loki(path.resolve(__dirname, FILE_NAME));

const collections = requireDir("./collections");
console.log(collections);

const inserts = requireDir("./insert", { recurse: true });
console.log(inserts);

Promise.all(
	new Array().concat(
		Object.values(collections).map((collection) => collection(db)),
		...Object.values(inserts).map((insertDict) => {
			const func = (insert) => {
				if (typeof insert === "function") return insert(db);
				if (typeof insert === "object") {
					return Object.values(insert).map(v => func(v));
				}
			};
			return func(insertDict);
		}),
	)
).then((results) => {
	const test = db.getCollection("test");
	test.insert({ "aaaa": 1234 });
	db.save((err) => {
		if (err) return console.error(err);
		results.forEach((result) => console.log(result));
		console.log("done!");
	});
})