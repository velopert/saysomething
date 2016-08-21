var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/index.js', './src/stylesheets/main.scss'],

    output: {
        path: '/',
        filename: 'bundle.js'
    },

    devServer: {
        hot: true,
        inline: true,
        host: '0.0.0.0',
        port: 4000,
        contentBase: __dirname + '/public/',
        proxy: {
            "*": "http://localhost:3000" // express 서버주소
        }
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel?' + JSON.stringify({
                    cacheDirectory: true,
                    presets: ['es2015', 'react', 'stage-0']
                })],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    resolve: {
        root: path.resolve('./src')
    }
};
