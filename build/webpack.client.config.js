const { join, resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')


const config = merge(base, {
  context: __dirname,

  entry: [
    'babel-polyfill',
    join(__dirname, './../src/entry-client.js'),
    join(__dirname, './../src/assets/scss/app.scss')
  ],

  resolve: {
    alias: {
      '~api': resolve('./src/api/index-client.js')
    }
  },

  module: {
    rules: [
      {
        test: /\.es6$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          use : [
            {
              loader: 'css-loader',
              options: { minimize: false }
            },
            'sass-loader'
          ],
          fallback: 'vue-style-loader'
        })
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].bundle.css',
      allChunks: true
    }),
    new VueSSRClientPlugin(),
  ]
})

module.exports = config
