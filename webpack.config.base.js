// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const MinCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[hash:6].js',
        publicPath: '/'
    },
    // resolve: {
    //     modules: ['./src/components', 'node_modules'], // webpack寻找模块的顺序，从左至右
    //     alias: {
    //         'react-native': '@my/react-native-web'   // 给包配置别名
    //     },
    //     extensions: ['web.js', '.js', '.json'], // 省略后缀名
    //     enforceExtension: true, // 设置为true不能省略文件后缀
    //     mainFields: ['style', 'main'] // 配置去package.json的哪个字段下去寻找包
    // },
    plugins: [
        new MinCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            Component: ['react', 'Component'],
            Vue: ['vue/dist/vue.ems.js', 'default'],
            $: 'jquery',
            _map: ['lodash', 'map']
        }),
        new CopyWebpackPlugin([
            {
                from: 'public/js/*.js',
                to: path.resolve(__dirname, 'dist', 'js'),
                flatten: true
            }
        ], {
            ignore: ['other.js']
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            config: config,
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './public/login.html',
            filename: 'login.html',
            config: config,
            chunks: ['login']
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(le|c)ss$/,
                use: [{
                    loader: MinCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    }
                }, 'css-loader', 'less-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240, //10K
                            esModule: false,
                            name: '[name]_[hash:6].[ext]',
                            outputPath: 'assets'
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    }
}
