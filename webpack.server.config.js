const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = (env) => {
	const isProduction = env === 'production';

	return {
		entry: './app.js',
		output: {
			path: path.join(__dirname, 'server'),
			filename: 'app.js'
		},
		module: {
			rules: [{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/
			}]
		},
		plugins: [],
		target: 'node',
		externals: [nodeExternals()],
		node: {
			__dirname: false
		},
		devtool: isProduction ? 'nosources-source-map' : 'inline-source-map',
		devServer: {
			contentBase: path.join(__dirname, 'server'),
			historyApiFallback: true,
			publicPath: '/'
		}
	};
};