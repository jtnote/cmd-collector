const path = require('path');
const HWP = require('html-webpack-plugin');
module.exports = {
    entry: path.join(__dirname, '/Index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    optimization: {
        // We no not want to minimize our code.
        minimize: false
    },
    //    plugins:[
    //        new HWP(
    //           {template: path.join(__dirname,'/index.html')}
    //        )
    //    ]
}