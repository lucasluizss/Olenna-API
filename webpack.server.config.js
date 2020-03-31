const path = require('path');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = (env) => {
	const isProduction = env === 'production';

	return {
		entry: './server.js',
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
		plugins: [
			new Dotenv({
				path: '.env',
				safe: true,
				systemvars: true,
				silent: true,
				defaults: false
			})
		],
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
