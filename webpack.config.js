const path = require('path');
//currently, babel-minify-webpack-plugin causes sourcemap problem. Either disable sourcemap or use another minifier
//https://github.com/webpack-contrib/babel-minify-webpack-plugin/issues/68 
const MinifyPlugin = require("babel-minify-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/main.js',
    restaurant: './src/js/restaurant_info.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'commons'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: "file-loader?name=/img/[name].[ext]"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // new MinifyPlugin(),
    new CopyWebpackPlugin([
      { context: './src/', from: '*', to: '', ignore: [ 'index.html', 'restaurant.html' ] },
      { context: './src/', from: 'img/*', to: '' }
    ], { copyUnmodified: true }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['commons', 'main'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'restaurant.html',
      template: './src/restaurant.html',
      chunks: ['commons', 'restaurant'],
      inject: true
    })
  ]
}
