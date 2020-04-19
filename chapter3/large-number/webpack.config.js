

const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    mode: 'none',// 设置为production会开启压缩，而我们的开发版本不需要压缩
    entry: {
        'large-number': './src/index.js',
        'large-number.min': './src/index.js'
    },
    output: {
        filename: '[name].js',
        library: 'largeNumber-zt',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    optimization: {
        minimize: true,// 压缩
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js/,// 匹配规则，只对min.js开启压缩
            })
        ]
    }
}