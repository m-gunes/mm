var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSASS = new ExtractTextPlugin('css/[name].css');

module.exports = {
    entry: {
        main: './reactPage/index.js',
    },
    output: {
        filename: 'react/[name].js',
        path: path.resolve(__dirname, 'public' ),
        publicPath: './public/',    
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractSASS.extract({
                    fallback: 'style-loader',
                    use: [
                        { 
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: true
                            }
                        }, 
                        {loader: 'sass-loader'}
                    ]
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader?name=img/[name].[ext]'
                ]

            },
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','react']
                    }
                }
            }
        ]
    },
    plugins: [
        extractSASS
    ]
}