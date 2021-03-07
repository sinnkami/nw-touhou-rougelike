const gulp = require("gulp");
const args = require("./lib/value");
gulp.watch = require("gulp-watch");

gulp.task("watch", callback => {
	if (!args.watch) {
		return callback();
	}

	gulp.watch(`${args.src}/package.json`, gulp.series("package"));
	gulp.watch(`${args.src}/scripts/**/*`, gulp.series("scripts"));
	gulp.watch(`${args.src}/index.html`, gulp.series("view"));

});
