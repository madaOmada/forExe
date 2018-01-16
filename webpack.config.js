'use strict'
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

var pageIndex=[
    'first'
],configEntry={},
    pluginConfig=[];

pageIndex.forEach(function (item) {
    configEntry[item] = path.resolve( __dirname , './src/'+ item + '/main.js')
})

pageIndex.forEach(function (item) {
    pluginConfig.push(new HtmlWebpackPlugin({
        filename: 'template/'+item+'/index.html'
    }))
})

module.exports = {
    entry: configEntry,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name]/main[chunkhash].js'
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
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url?limit=8192&name=[name]/img/[hash].[ext]',
                //loaders: [
                //    //小于10KB的图片会自动转成dataUrl，
                //    'url?limit=10000&name=img/[hash:8].[name].[ext]',
                //    'image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}'
                //]
            }
        ]
    },
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        port: '8080',//监听端口，缺省值8080
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
    },
    plugins: pluginConfig.concat([
        new ExtractTextPlugin('css/[name].css?[contenthash]')
    ])
};