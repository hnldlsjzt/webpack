'use strict'
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin') // 优化构建日志
const glob = require('glob')
// 单页面打包
// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     filename: "bundle.js",// 单文件可以写死
//     path: path.join(__dirname, "dist"),
//   },
//   mode: "production",
// };

const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []

  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
  entryFiles.map(item => {
    const entryFile = item
    const match = entryFile.match(/src\/(.*)\/index\.js$/)
    const pageName = match && match[1]
    entry[pageName] = item
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `./src/${pageName}/index.html`),
        filename: `${pageName}/index.html`, // 输出后的文件名称
        inject: true, // 注入关联的js 和 css，默认注入
        chunks: ['vendors', 'commons', pageName], // 如果不指定引入的文件，那默认所有的css，js都会全部引入。在多页面打包中尤为重要。
        minify: {
          html5: true,
          collapseWhitespace: true, // 清理html中的空格、换行符。
          preserveLineBreaks: false, // 保留换行符
          minifyCSS: true, // 只会压缩当前html中的CSS
          minifyJS: true, // 只会压缩当前html中的JS
          removeComments: false // 删除注释
        }
      })
    )
  })
  return {
    entry,
    htmlWebpackPlugins
  }
}
const { entry, htmlWebpackPlugins } = setMPA()
// 多页面打包
module.exports = {
  entry: entry,
  output: {
    filename: '[name]_[contenthash:8].js', // 多文件需要使用占位符
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: path.resolve(__dirname, './src')
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 设计稿为750，如是375就是37.5
              remPrecision: 8
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      // {
      //   test: /\.(png|jpg|jpeg|gif|)$/,
      //   use: [
      //     {
      //       loader: "url-loader",// url-loader 支持返回 base64 编码
      //       options: {
      //         limit: 10240,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
      chunkFilename: 'index.css'
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcesso: require('cssnano')
    }),
    new CleanWebpackPlugin(),
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: "react",
    //       entry: "https://now8.gtimg.com/now/lib/16.8.6/react.min.js",
    //       global: "React",
    //     },
    //     {
    //       module: "react-dom",
    //       entry: "https://now8.gtimg.com/now/lib/16.8.6/react-dom.min.js",
    //       global: "ReactDOM",
    //     },
    //   ],
    //   files: ["index/index.html"],
    // }),
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: "react",
    //       entry: "https://now8.gtimg.com/now/lib/16.8.6/react.min.js",
    //       global: "React",
    //     },
    //     {
    //       module: "react-dom",
    //       entry: "https://now8.gtimg.com/now/lib/16.8.6/react-dom.min.js",
    //       global: "ReactDOM",
    //     },
    //   ],
    //   files: ["search/index.html"],
    // }),
    new FriendlyErrorsWebpackPlugin(),
    function () {
      // 这里是 this 是 compiler
      this.hooks.done.tap('done', stats => {
        // console.log("stats", stats.compilation.errors, process.argv);
        if (
          stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf('--watch') == -1
        ) {
          // console.log("build error");
          process.exit(1)
        }
      })
    }
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, "./src/search.html"),
    //   filename: "search.html", // 输出后的文件名称
    //   inject: true, // 注入关联的js 和 css，默认注入
    //   // chunks: ["search"],// 如果不指定引入的文件，那默认所有的css，js都会全部引入。在多页面打包中尤为重要。
    //   minify: {
    //     html5: true,
    //     collapseWhitespace: true, // 清理html中的空格、换行符。
    //     preserveLineBreaks: false, // 保留换行符
    //     minifyCSS: true, // 只会压缩当前html中的CSS
    //     minifyJS: true, // 只会压缩当前html中的JS
    //     removeComments: false, // 删除注释
    //   },
    // }),
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, "./src/index.html"),
    //   filename: "index.html",
    //   inject: true,
    //   chunks: ["index"], // 如果不指定引入的文件，那默认所有的css，js都会全部引入
    //   minify: {
    //     html5: true,
    //     collapseWhitespace: true,
    //     preserveLineBreaks: false,
    //     minifyCSS: true,
    //     minifyJS: true,
    //     removeComments: false,
    //   },
    // }),
  ].concat(htmlWebpackPlugins),
  // externalsType: 'script',
  // react 和 reactDom 如果要提取，那也应该是放在html里加载。而不是入口js里做懒加载
  // externals: {
  //   react: ['https://now8.gtimg.com/now/lib/16.8.6/react.min.js', 'React'],
  //   'react-dom': ['https://now8.gtimg.com/now/lib/16.8.6/react-dom.min.js', 'ReactDOM']
  //   // 'react-dom': 'ReactDOM'
  // },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
    // 'react-dom': 'ReactDOM'
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // 单独设置这个属性也可以做到 切割
      minSize: 0,
      cacheGroups: {
        // 抽离通用包
        // vendor: {
        //   name: "vendors", // 改了后，需要把他加到 htmlwebpackplugin的chunk中
        //   chunks: "all",
        //   test: /(react|reactdom)/, // 建议仅包括您的核心框架和实用程序，并动态加载其余依赖项。
        //   priority: -10, // 设置下权重，防止重复
        // },
        // 抽离使用多次的函数组件
        commons: {
          name: 'commons', // 打包文件名
          chunks: 'all', // 所有引入的库进行分离（推荐）
          minChunks: 2, // 只要引用两次就打包为一个文件
          priority: -20 // 设置下权重，防止重复
        }
      }
    }
  },
  resolve: {
    alias: {
      react: path.resolve(
        __dirname,
        './node_modules/react/umd/react.production.min.js'
      ),
      'react-dom': path.resolve(
        __dirname,
        './node_modules/react-dom/umd/react-dom.production.min.js'
      )
    }, // 声明别名，另外告诉webpack查找包时，直接去这个目录找
    extensions: ['.js'], // 补齐后缀
    modules: [path.resolve(__dirname, './node_modules')] // 查找包时，只到当前项目的node_modules中找
  },
  stats: 'errors-only',
  mode: 'production',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  }
}
