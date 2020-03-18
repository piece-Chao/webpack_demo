const { smart } = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

module.exports = smart(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: '3000',
        quiet: false,
        inline: true,
        stats: 'errors-only',
        overlay: false,
        clientLogLevel: 'silent',
        compress: true,
        hot: true,
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            DEV: JSON.stringify('dev'),
            FLAG: 'true'
        })
    ]
})