const webpack = require('webpack')
const { resolve } = require('path')
const Dotenv = require('dotenv-webpack')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

const isProd = process.env.NODE_ENV === 'production'

let plugins = [
  new Dotenv()
]

if (isProd) {
  plugins.push(
    new UglifyJsPlugin({
      parallel: true,
      sourceMap: false,
      uglifyOptions: {
        mangle: {
          safari10: true
        }
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  )
}

module.exports = {
  devtool: isProd ? false : '#cheap-module-source-map',
  output: {
    filename: 'build.[hash].js',
    publicPath: '/dist/bundles/',
    path: resolve(__dirname, './../dist/bundles'),
  },
  resolve: {
    alias: {
      '~': resolve('./'),
      '@': resolve('./src'),
      'vue$': 'vue/dist/vue.js',
      '@views': resolve('./src/views'),
      '@components': resolve('./src/components'),
      '~api': resolve('./src/api/index-client.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [require('autoprefixer')()]
        }
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  plugins
}
