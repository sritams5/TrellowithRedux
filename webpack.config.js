var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
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
					  loader: 'postcss-loader',
					  options: {
					    plugins: function () { 
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
                test: /\.(svg|png|gif|jpg)$/,
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
        new webpack.ProvidePlugin({
        	"$":"jquery",
	      	"jQuery":"jquery",
	      	"window.jQuery":"jquery",
	      	'global.jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
    ],
    devtool: 'source-map',
    mode: 'development'
};
