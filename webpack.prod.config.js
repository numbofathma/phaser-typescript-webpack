const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');
const TerserPlugin = require('terser-webpack-plugin');

const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-arcade-physics.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
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
  mode: 'production',
  devtool: false,
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './assets', to: './assets' },
      ],
      options: {
        concurrency: 100,
      },
    }),
    new JavaScriptObfuscator({
      rotateUnicodeArray: true
    }, ['vendor.bundle.js']),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
    })
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),
    ],
  },
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
