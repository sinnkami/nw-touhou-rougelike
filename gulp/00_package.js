const gulp = require("gulp");
const args = require("./lib/value");

gulp.task("package", function() {
	return gulp
		.src(`${args.src}/package.json`)
		.pipe(gulp.dest(`${args.dest}/`))
});
