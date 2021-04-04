const args = require("./gulp/lib/value");

const { resolve } = require("path");

module.exports = {
	mode: "development",
	// エントリーポイントの設定
	entry: resolve(args.src, "scripts", "main.ts"),
	devtool: "inline-source-map",
	// 出力の設定
	output: {
		// 出力するファイル名
		filename: "bundle.min.js",
	},
	// optimization: {
	// 	minimize: true
	// },
	resolve: {
		extensions: [".ts"],
	},
	module: {
		rules: [
			{
				// ローダーの処理対象ファイル
				test: /\.ts$/,
				// ローダーの処理対象から外すディレクトリ
				exclude: /node_modules/,
				use: {
					// 利用するローダー
					loader: "babel-loader",
					options: {
						presets: [
							[
								"@babel/preset-env",
								{
									targets: {
										node: "4.9.1",
									},
								}
							],
							"@babel/typescript",
						],
						plugins: [
							"@babel/proposal-class-properties",
							"@babel/proposal-object-rest-spread",
						],
					},
				},
			},
		],
	},
};
