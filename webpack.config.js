const path = require('path');
//babel-minify-webpack-plugin and sourcemap problem: https://github.com/webpack-contrib/babel-minify-webpack-plugin/issues/68 
const MinifyPlugin = require("babel-minify-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const extractCSS = new ExtractTextPlugin({ filename: 'css/bundle.css' });
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  mode: 'production',
  entry: {
    main: './src/js/main.js',
    restaurant: './src/js/restaurant_info.js'
  },
  // devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: './dist'
  // },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    leaflet: 'L'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'commons'
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [ 'css-loader' ]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'responsive-loader',
          options: {
            sizes: [400],
            name: 'img/[name]_[width].[ext]'
          }
        }
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
    new MinifyPlugin(),
    extractCSS,
    new ImageminPlugin({test: /\.(png|jpg|gif)$/}),
    new CopyWebpackPlugin([
      { context: './src/public/', from: '*', to: '', ignore: [ 'index.html', 'restaurant.html' ] },
      { context: './src/public/', from: 'img/*.jpg', to: 'img/[name]_800.[ext]' }
    ], { copyUnmodified: true }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/public/index.html',
      chunks: ['commons', 'main'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'restaurant.html',
      template: './src/public/restaurant.html',
      chunks: ['commons', 'restaurant'],
      inject: true
    })
  ]
}
