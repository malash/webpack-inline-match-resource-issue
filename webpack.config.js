const { resolve } = require("path");

module.exports = {
	mode: process.env.NODE_ENV || "development",
	devtool: "none",
	entry: resolve(__dirname, "./file.js"),
	output: {
		path: resolve(__dirname, "dist"),
		filename: "index.js"
	},
	module: {
		rules: [
			{
				test: /\.js/,
				use: [
					{
						loader: require.resolve("./extract-style-loader")
					}
				]
			},
			{
				test: /\.css/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[path][name].css"
						}
					}
				]
			}
		]
	}
};
