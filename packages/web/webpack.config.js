const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: './src/index.tsx',
  output: {
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
  },
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
      {
        test: /\.(png|svg|jpg)$/,
        use: 'file-loader',
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
    new Dotenv(),
  ],
  node: {
    fs: 'empty',
  },
}
