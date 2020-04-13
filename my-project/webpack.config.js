'use strict'

const path = require('path')

// 单页面入口配置
// module.exports = {
//     mode: 'production',
//     entry: './src/index.js',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'bundle.js'
//     }

// }

// 多页面入口配置
// module.exports = {
//     mode: 'production',
//     entry: {
//         index: './src/index.js',
//         search: './src/search.js'
//     },
//     output: {
//         filename: '[name].js',
//         path: path.join(__dirname + '/dist')
//     }
// }

// 多页面入口+loader解析
module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname + '/dist')
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    }
}