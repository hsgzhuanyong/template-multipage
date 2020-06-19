module.exports = {
  ident: 'postcss',
  plugins: [
    require('postcss-import'),
    require('autoprefixer'),
    require('postcss-px2rem-exclude')({
      remUnit: 100,
      exclude: /node_modules/i
    }),
    require('cssnano')
  ]
}
