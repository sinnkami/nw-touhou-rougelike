const gulp = require("gulp");
const args = require("./lib/value");

const { resolve } = require("path");

gulp.task("view", function () {
	return gulp
		.src(resolve(args.src, "index.html"))
		.pipe(gulp.dest(resolve(args.dest)))
})