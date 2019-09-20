const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.pug$/,
        loader: ['pug-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      '@yotta/web': path.resolve(__dirname),
    },
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug',
    }),
  ],
  node: {
    fs: 'empty',
  },
}
