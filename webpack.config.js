const webpack = require('webpack');
const path = require('path');

const { NODE_ENV } = process.env;
const production = NODE_ENV === 'production';

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
];

if (production) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
                warnings: false
            }
        })
    );
}

module.exports = {
    entry: path.join(__dirname, 'src/base.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: `redux-oopsome${production ? '.min' : ''}.js`,
        library: 'ReduxOOPsome',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins
};