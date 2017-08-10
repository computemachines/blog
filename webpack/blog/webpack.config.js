const {resolve} = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const cssFromSassLoaders = [
  {
    loader: 'css-loader',
    options: {sourceMap: true}
  },
  {
    loader: "postcss-loader",
    options: {
      plugins: [require("autoprefixer")],
      sourceMap: true
    }
  },
  {
    loader: "sass-loader", options: {
      sourceMap: true,
      includePaths: [
	resolve('./node_modules/bootstrap/scss')
      ]
    }
  }];

module.exports = () => {
  return {
    context: resolve('src'),
    entry: ['./scripts/program.js', './style/critical.scss'],
    output: {
      path: resolve("/assets"), // should be ./assets in dev
      publicPath: "/assets/",
      filename: 'bundle.js'
    },
    module: {
      rules: [
	{
	  test: /\.js$/,
	  use: {
	    loader: 'babel-loader',
	    options: {
	      presets: ['es2015']
	    }
	  },
	  exclude: /node_modules/
	},
	{
	  test: /critical.scss$/,
	  use: ExtractTextPlugin.extract({
	    fallback: 'style-loader',
	    use: cssFromSassLoaders
	  })
	},
	{
	  test: /\.scss$/,
	  exclude: /critical.scss$/,
	  use: ['style-loader', ...cssFromSassLoaders]
	},
	{
	  test: /\.(png|svg|jpg|gif)$/,
	  use: ['file-loader'] 
	}]
    },
    devtool: "eval",
    plugins: [new ExtractTextPlugin("critical.css")]
  };
};
