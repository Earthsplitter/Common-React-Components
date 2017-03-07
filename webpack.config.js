/**
 * Created by wenming on 26/01/2017.
 */
const webpack = require('webpack');

module.exports = {
    entry: './app.js',

    output: {
        filename: 'bundle.js',
        publicPath: '/'
    },

    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react'},
            {test: /\.json$/, loader: 'json'}
        ]
    }
};
