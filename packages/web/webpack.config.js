const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
    new CopyPlugin([{ from: 'assets', to: 'assets/' }]),
  ],
  node: {
    fs: 'empty',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
