import yargs from "yargs";

const argv = yargs(process.argv.slice(2))
	.option("compression", {
		boolean: true,
		default: false,
		describe: "圧縮ファイルに変換するかどうか",
	})
	.option("watch", {
		boolean: true,
		default: false,
		describe: "永続化するか",
	}).argv;

const value = {
	dest: "dist/",
	src: "app",
	build: "build/",
	watch: argv.watch,
	sourcemaps: argv.sourcemaps,
	compression: argv.compression,
};

module.exports = value;
