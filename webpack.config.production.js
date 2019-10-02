const {resolve, join} = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const os = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')

const ROOT_PATH = resolve(__dirname)
const SRC_PATH = resolve(ROOT_PATH, 'src')
const DIST_PATH = resolve(ROOT_PATH, './dist')
const LIBS_PATH = resolve(ROOT_PATH, 'libs')
const TEM_PATH = resolve(LIBS_PATH, 'template')
const DLL_PATH = resolve(__dirname,'./dist/common')
const NODE_PATH = resolve(__dirname,'./node_modules')

const publicPath = '/static/blogs/dist/'

module.exports = {
    // devtool: 'source-map',
    entry: {
        vendors: [
            'superagent',
            'lodash',
            'qs',
            'babel-polyfill',
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'redux'
        ],
        index: resolve(SRC_PATH, 'index.jsx')
    },
    output: {
        path: DIST_PATH,
        publicPath: publicPath,
        filename: 'js/[name]-[chunkhash:8].js',
        chunkFilename: 'js/[name]-[chunkhash:8].js'
    },
    module: {
        rules:[
            {
                test: /\.(js|jsx)?$/,
                include: SRC_PATH,
                use: ['happypack/loader?id=babel'],
            },
            {
                test: /\.(scss|css)?$/,
                include: [SRC_PATH,LIBS_PATH,resolve(NODE_PATH,'antd')],
                use:ExtractTextPlugin.extract({
                    fallback:['style-loader'],
                    use: ['happypack/loader?id=scss'],
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|svgz)?$/,
                include: SRC_PATH,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'image/[name]-[hash].[ext]'
                        }
                    },
                    {
                        loader:'image-webpack-loader',
                        options: {
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // Specifying webp here will create a WEBP version of your JPG/PNG images
                            webp: {
                                quality: 75
                            }
                        } 
                    }
                    
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss'],
        modules: [NODE_PATH],
    },
    externals: {
        zepto: '$',
        jquery: '$'
    },
    plugins: [
        new CommonsChunkPlugin({
            name: 'js/manifest', // 公共代码的chunk命名为 'verder'
            filename: '[name]-[chunkhash:8].js'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.BABEL_ENV': JSON.stringify('production')
        }),
        new CleanWebpackPlugin([DIST_PATH]),
        new ManifestPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 4-3使用HappyPack
        new HappyPack({
            // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
            id: 'babel',
            // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
            loaders: ['babel-loader?cacheDirectory'],
        }),
        new HappyPack({
            id: 'scss',
            threadPool: happyThreadPool,
            // 如何处理 .css 文件，用法和 Loader 配置中一样
            // 通过 minimize 选项压缩 CSS 代码
            // loaders: ['css-loader?minimize'],
            loaders: [
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        modules: true,
                        localIdentName: '[name]-[local]-[hash:base64:5]'
                    }
                },
                {
                    loader: 'postcss-loader'
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }),
        new ExtractTextPlugin({
            filename: 'css/[name]-[contenthash:8].css',
            disable: false,
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: 'zepto' || 'jquery',
            zepto: 'zepto',
            jQuery: 'jquery',
            'window.zepto': 'zepto',
            'window.jQuery': 'jquery'
        }),
        new ParallelUglifyPlugin({
            // 传递给 UglifyJS 的参数
            cacheDir: '.cache/babel-loader',
            uglifyJS: {
              output: {
                // 最紧凑的输出
                beautify: false,
                // 删除所有的注释
                comments: false,
              },
              compress: {
                // 删除所有的 `console` 语句，可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
              }
            },
        }),
        new HtmlWebpackPlugin({
            title: '首页',
            favicon:resolve(SRC_PATH,'favicon.ico'),
            keywords: '个人博客',
            description: '前端基于 react+redux+superagent 后端基于 node+express+mongoose 的个人博客',
            filepath: DIST_PATH,
            template: resolve(TEM_PATH, 'index.html'),
            filename: 'index.html',
            inject: true
        }),
        // new webpack.DllReferencePlugin({
        //     context: DLL_PATH,
        //     manifest: require('./dist/common/vendors-manifest.json'),
        // })
    ]
};