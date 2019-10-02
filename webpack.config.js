const {resolve} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const os = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const ROOT_PATH = resolve(__dirname)
const SRC_PATH = resolve(ROOT_PATH, 'src')
const DIST_PATH = resolve(ROOT_PATH, '../public/frontend')
const LIBS_PATH = resolve(ROOT_PATH, 'libs')
const TEM_PATH = resolve(LIBS_PATH, 'template')

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        index: resolve(SRC_PATH, 'index.jsx')
    },
    output: {
        path: DIST_PATH,
        filename: '[name].js'
    },
    module: {
        rules:[
            {
                test: /\.(js|jsx)?$/,
                include: SRC_PATH,
                use: ['happypack/loader?id=babel'],
            },
            {
                test: /\.(css|scss)?$/,
                include: [SRC_PATH,LIBS_PATH],
                use: ['happypack/loader?id=scss'],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|svgz)?$/,
                include: SRC_PATH,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'image/[name]-[contenthash].[ext]'
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
        extensions: ['.js', '.jsx', '.json', '.scss']
    },
    externals: {
        zepto: '$',
        jquery: '$'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'zepto' || 'jquery',
            zepto: 'zepto',
            jQuery: 'jquery',
            'window.zepto': 'zepto',
            'window.jQuery': 'jquery'
        }),
        new HappyPack({
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
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                    options: {
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
        new HtmlWebpackPlugin({
            title: '首页',
            favicon:resolve(SRC_PATH,'favicon.ico'),
            filepath: DIST_PATH,
            keywords: '个人博客',
            description: '前端基于 react+redux+superagent 后端基于 node+express+mongoose 的个人博客',
            template: resolve(TEM_PATH, 'index.html'),
            chunks: ['index'],
            filename: 'index.html',
            inject: 'body'
        })
    ],
    watchOptions: {
        // 4-5使用自动刷新：不监听的 node_modules 目录下的文件
        ignored: /node_modules/,
    },
    devServer: {
        inline: true,
        hot: true,
        // colors: true,
        historyApiFallback: true,
        progress: true,
        contentBase: ROOT_PATH,
        host: '0.0.0.0',
        port:'6008',
        disableHostCheck: true,
        proxy: {
            '/blog/*':{
                path:'/blog/*',    
                context: ['/ueditor/ue', '/img/ueditor'],
                target: 'http://localhost:4500',
                // target:'http://47.94.193.216:4500',
                host:'0.0.0.0',
                changeOrigin: true,
                ws: true,
                secure: false
            }
        }
    }
};