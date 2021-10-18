const requireDir = require("require-dir");
const path = require("path")

const FILE_NAME = "../app/database/db.json";
const loki = require("lokijs");
const db = new loki(path.resolve(__dirname, FILE_NAME));

const collections = requireDir(path.resolve(__dirname,"./collections"));

const inserts = requireDir(path.resolve(__dirname, "./insert"), { recurse: true });

Promise.all(
	new Array().concat(
		new Promise((resolve) => resolve("table list")),
		Object.values(collections).map((collection) => collection(db)),
		new Promise((resolve) => resolve("")),
		new Promise((resolve) => resolve("insert list")),
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
	db.save((err) => {
		if (err) return console.error(err);
		results.forEach((result) => console.log(result));
		console.log("done!");
	});
})