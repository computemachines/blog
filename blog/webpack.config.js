var path = require('path');

module.exports = {
  entry: './src/scripts/program.js',
  output: {
    path: path.resolve(__dirname, './computemachines/static/'),
    publicPath: "/static/",
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader'] //?name=/static/[hash].[ext]']
    }]
  }
};
