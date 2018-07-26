var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');


//var extractPlugin = new ExtractTextPlugin({
//   filename: 'main.css'
//});

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                	'style-loader',
                	'css-loader',
	            	{
					  loader: 'postcss-loader', // Run post css actions
					  options: {
					    plugins: function () { // post css plugins, can be exported to postcss.config.js
					      return [
					        require('precss'),
					        require('autoprefixer')
					      ]
					    }
					  }
					},
                	'sass-loader'
                	],
                	exclude: /node_modules/
            },
            {
                test: /\.(svg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/'
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        //extractPlugin,
        new webpack.ProvidePlugin({
        	"$":"jquery",
	      	"jQuery":"jquery",
	      	"window.jQuery":"jquery",
	      	'global.jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        //new CleanWebpackPlugin(['dist'])
    ],
    devtool: 'source-map',
    resolve: {
        alias: {
            //'jquery-ui': 'jquery-ui-dist/jquery-ui.js'
        }
    }
};