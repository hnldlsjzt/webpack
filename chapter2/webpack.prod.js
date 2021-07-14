'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')// css抽成文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')
const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugins = []
    // 获取所有的entry入口
    // const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));

    entryFiles.map(item => {
        const entryFile = item;
        const match = entryFile.match(/src\/(.*)\/index\.js/)
        const pageName = match && match[1]
        entry[pageName] = item

        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `src/${pageName}/index.html`),
                filename: `${pageName}/index.html`,// 生成后的文件
                chunks: ['vendors', pageName],// 如果不指定引入的文件，那默认所有的css，js都会全部引入
                inject: true,// script注入的位置，默认是body底部前面
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false
                }
            })
        )
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    mode: 'production',
    // entry: {
    //     index: './src/index.js',
    //     search: './src/search.js'
    // },
    entry: entry,// 动态配置多页面入口
    output: {
        filename: '[name]_[chunkhash:8].js',
        path: path.join(__dirname, 'dist')
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
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: ['last 2 version']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,// 相当于750设计稿
                            remPrecision: 8,// rem保留小数位
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: ['last 2 version']
                                })
                            ]
                        }
                    },
                    'less-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,// 相当于750设计稿
                            remPrecision: 8,// rem保留小数位
                        }
                    }

                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcesso: require('cssnano')
        }),
        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname, 'src/search.html'),
        //     filename: 'search.html',
        //     chunks: ['search'],
        //     inject: true,
        //     minify: {
        //         html5: true,
        //         collapseWhitespace: true,
        //         preserveLineBreaks: false,
        //         minifyCSS: true,
        //         minifyJS: true,
        //         removeComments: false
        //     }
        // }),
        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname, 'src/index.html'),
        //     filename: 'index.html',// 生成后的文件
        //     chunks: ['index'],// 如果不指定引入的文件，那默认所有的css，js都会全部引入
        //     inject: true,// script注入的位置，默认是body底部前面
        //     minify: {
        //         html5: true,
        //         collapseWhitespace: true,
        //         preserveLineBreaks: false,
        //         minifyCSS: true,
        //         minifyJS: true,
        //         removeComments: false
        //     }
        // }),
        new CleanWebpackPlugin()
    ].concat(htmlWebpackPlugins)
}