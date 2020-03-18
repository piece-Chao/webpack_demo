const webpack = require('webpack');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const { smart } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = smart(baseConfig, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new OptimizeCssPlugin(),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**']  // 规定哪些包在打包的时候不被清理
        }),
        new webpack.DefinePlugin({
            DEV: JSON.stringify('prod')
        })
    ]
})