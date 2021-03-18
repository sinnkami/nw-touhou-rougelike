const NwBuilder = require("nw-builder");
const args = require("./gulp/lib/value");
const path = require("path");

const nw = new NwBuilder({
	files: path.resolve(args.dest, "**", "*"),
	platforms: ["osx64", "win32", "win64"],
	version: "0.18.2",
	flavor: "sdk",
	appName: "テスト",
	appVersion: "1.0.0",
	buildDir: args.build,
	cacheDir: "./cache/",
	buildType: "default",
	forceDownload: false,
	macCredits: false,
	macIcns: false, // path
	winIco: null, // path
	zip: true,

});

nw.on('log', console.log);

nw.run().then(function () {
	console.log('all done!');
}).catch(function (error) {
	console.error(error);
});