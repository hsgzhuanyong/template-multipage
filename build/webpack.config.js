const resolve = require('path').resolve
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
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
      new OptimizeCssAssetsWebpackPlugin()
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
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: './images/',
              outputPath: 'images/'
            }
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
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'pages/about/index.html',
      template: resolve(__dirname, '../src/pages/about/index.html'),
      minify: false,
      chunks: ['index']
    }),
    /*
    * 将css提取到单独的css文件中
    * */
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    })
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
