const resolve = require('path').resolve
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const uglify = require('uglifyjs-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
// const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    'pages/home/index': resolve(__dirname, '../src/pages/home/index.js'),
    'pages/about/index': resolve(__dirname, '../src/pages/about/index.js')
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, '../dist')
  },
  optimization: {
    minimizer: [
      /**
       * css压缩
       */
      !isDev && new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/css',
              hmr: isDev,
              reloadAll: true
            }
          },
          {
            loader: 'css-loader'
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[hash].[ext]',
              publicPath: '/images',
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(html)$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              esModule: true
            }
          }
        ]
      },
      {
        test: /\.(js)$/i,
        exclude: /(node_modules|bower_components)$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'pages/home/index.html',
      template: resolve(__dirname, '../src/pages/home/index.html'),
      minify: false,
      chunks: ['pages/home/index']
    }),
    new HtmlWebpackPlugin({
      filename: 'pages/about/index.html',
      template: resolve(__dirname, '../src/pages/about/index.html'),
      minify: false,
      chunks: ['pages/about/index']
    }),
    /*
    * 将css提取到单独的css文件中
    * */
    new MiniCssExtractPlugin({
      filename: isDev ? 'css/[name].css' : 'css/css.[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    /*
    * 压缩js
    * */
    new uglify()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src')
    }
  },
  devServer: {
    open: true
  }
}
