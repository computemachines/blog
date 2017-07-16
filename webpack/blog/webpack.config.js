const {resolve} = require('path');

module.exports = () => {
  return {
    context: resolve('src'),
    entry: './scripts/program.js',
    output: {
      path: resolve(__dirname, './computemachines/static/'),
      publicPath: "/static/",
      filename: 'bundle.js'
    },
    module: {
      rules: [{
	test: /\.js$/,
	use: {
	  loader: 'babel-loader',
	  options: {
	    presets: ['es2015']
	  }
	},
	exclude: /node_modules/
      }, {
	test: /\.css$/,
	use: ['style-loader', 'css-loader']
      }, {
	test: /\.(png|svg|jpg|gif)$/,
	use: ['file-loader'] //?name=/static/[hash].[ext]']
      }]
    },
    devtool: "eval" // TODO: necessary for production?
  };
};
