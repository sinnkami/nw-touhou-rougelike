const gulp = require("gulp");
const args = require("./lib/value");

const { resolve } = require("path");

const webpack = require("webpack");
const webpackStream = require("webpack-stream");

const webpackConfig = require("../webpack.config");

gulp.task("scripts", function () {
	return gulp
		.src(resolve(args.src, "scripts"))
		.pipe(webpackStream(webpackConfig, webpack))
		.pipe(gulp.dest(resolve(args.dest, "scripts")))
})