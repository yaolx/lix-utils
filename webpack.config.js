const path = require('path')
const _ = require('lodash')
const { TsConfigPathsPlugin } = require('awesome-typescript-loader')

const rootPath = path.resolve(__dirname, './')

const config = {
  mode: 'development',
  entry: path.resolve(rootPath, 'src', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'eb-utils.js',
    library: 'EBUtils',
    libraryTarget: 'umd'
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsConfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: /node_modules/,
        exclude: [path.resolve(rootPath, 'src')]
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        include: [path.resolve(rootPath, 'src')]
      }
    ]
  }
}

module.exports = config
