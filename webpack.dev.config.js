const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-arcade-physics.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');
const howler = path.join(__dirname, '/node_modules/howler/dist/howler.min.js');

module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, 'src/app.ts')
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('./dist'),
    publicPath: '/'
  },
  plugins: [
    new ESLintPlugin({
      files: ['./src/**/*.ts']
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body'
    })
  ],
  module: {
    rules: [
      { test: /\.ts?$/, loader: 'ts-loader', exclude: '/node_modules/' },
      { test: /\.js?$/, loader: 'eslint-loader', exclude: '/node_modules/' },
      { test: /pixi\.js/, loader: 'expose-loader?PIXI' },
      { test: /phaser-arcade-physics\.js/, loader: 'expose-loader?Phaser' },
      { test: /howler\.min\.js/, loader: 'expose-loader?Howler' },
      { test: /p2\.js$/, loader: 'expose-loader?p2' }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      'phaser-ce': phaser,
      'pixi': pixi,
      'p2': p2,
      'howler': howler
    }
  }
};