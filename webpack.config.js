'use strict'
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        test1: path.resolve(__dirname, './src/main.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false
                        }
                    }
                ],
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
                //use: [
                //    {
                //        loader: 'url-loader',
                //        options:{
                //            limit:8192,
                //            name:'name=img/[name].[hash:8].[ext]',
                //        }
                //    }
                //],
                loaders: [
                    //小于10KB的图片会自动转成dataUrl，
                    'url?limit=10000&name=img/[hash:8].[name].[ext]?[contenthash]',
                    'image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}'
                ]
            }
        ]
    },
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        port: '8080',//监听端口，缺省值8080
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '测试1',
            filename: 'index.html',
            template: path.resolve(__dirname, './src/index.html')
        }),
        new ExtractTextPlugin('css/[name].css?[contenthash]')
    ]
};