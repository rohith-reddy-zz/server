const path = require('path');

module.exports = {
  // Tell webpack the root file of our application
  entry: './src/client/client.js',

  // Tell webpack where to put the output file generated(bunndle)
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  // Tell webpack to run babel on every file it runs through
  // test - expression that is tested against every filename and apply loader to transpile if there is a match
  // presets - rules followed by the loader in transpiling
  // about presets - react: for converting jsx, stage-0: for converting some async code, env: kind of master preset that
  // webpack uses to run all of the different transform rules  needed to meet the requirements of the latest 2 versions
  // of all popular browsers
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0',
            ['env', {targets: { 'browser': ['last 2 versions'] } } ]
          ]
        }
      }
    ]
  }
}
