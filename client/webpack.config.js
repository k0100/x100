//webpack --config client/webpack.config.js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
module.exports = {
    entry: "./client/app/main.ts",
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: "bundle.js"
    },
    plugins:
        [new UglifyJsPlugin({

            uglifyOptions: {

                mangle: false,
                compress: false,

                sourceMap: true
            }
        })
        ],
    mode: 'development',
    watch: true
};