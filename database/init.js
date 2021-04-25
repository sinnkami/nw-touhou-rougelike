const requireDir = require("require-dir");
const path = require("path")

const FILE_NAME = "../app/database/db.json";
const loki = require("lokijs");
console.log(path.resolve(__dirname, FILE_NAME));
const db = new loki(path.resolve(__dirname, FILE_NAME));

const collections = requireDir("./collections");
console.log(collections);

Promise.all(Object.values(collections).map((collection) => collection(db))).then((results) => {
	const test = db.getCollection("test");
	test.insert({"aaaa": 1234});
	db.save((err) => {
		if (err) return console.error(err);
		results.forEach((result) => console.log(result));
		console.log("done!");
	});
})