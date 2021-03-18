const gulp = require("gulp");
const args = require("./lib/value");

const del = require("del");

gulp.task("reset:all", callback => {
	return del(`${args.dest}/**/*`, callback);
})

gulp.task("reset", gulp.series("reset:all"));
