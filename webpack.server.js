const path = require('path');
const merge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');

const baseConfig = require('./webpack.base');

const config = {
  // Inform webpack that we are builing a bundle for nodeJS, rather than browser
  target: 'node',

  // Tell webpack the root file of our application
  entry: './src/index.js',

  // Tell webpack where to put the output file generated(bunndle)
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  externals: [webpackNodeExternals()]
}

module.exports = merge(baseConfig, config);
