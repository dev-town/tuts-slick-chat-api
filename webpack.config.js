// webpack.config.js
const slsw = require('serverless-webpack');
const path = require('path');

// Article about externals
// https://stackoverflow.com/questions/57731322/excluding-node-modules-from-webpack-on-serverless
const nodeExternals = require('webpack-node-externals');
const isLocal = slsw.lib.webpack.isLocal;

module.exports = {
    mode: isLocal ? 'development' : 'production',
    entry: slsw.lib.entries,
    target: 'node',
    devtool: 'source-map',
    module: {
        rules: [
            { test: /\.ts$/, exclude: /node_modules/, loader: 'babel-loader' },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, '.webpack'),
        filename: '[name].js'
      },
    // we use webpack-node-externals to excludes all node deps.
    // You can manually set the externals too.
    externals: [nodeExternals()],
};
