const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-arcade-physics.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'assets'),
      publicPath: '/assets',
    },
    hot: true,
    open: true,
    compress: true,
    port: 8000,
  },
  entry: {
    app: [
      path.resolve(pixi),
      path.resolve(p2),
      path.resolve(__dirname, 'src/app.ts'),
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
      {
        test: /\.(j|t)s$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /pixi\.js/,
        use: {
          loader: 'expose-loader',
          options: {
            exposes: ['PIXI', pixi]
          }
        }
      },
      {
        test: /p2\.js$/,
        use: {
          loader: 'expose-loader',
          options: {
            exposes: ['p2', p2]
          }
        }
      },
      {
        test: /phaser-arcade-physics\.js/,
        use: {
          loader: 'expose-loader',
          options: {
            exposes: ['Phaser', phaser]
          }
        }
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      'phaser-ce': phaser,
      'pixi': pixi,
      'p2': p2,
    }
  }
};
