const path = require('path');

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
      {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['@babel/preset-env'],
	          plugins: [
	          	[
	          		'@babel/plugin-transform-react-jsx',
	          		{ pragma: "ToyReact.createElement"}
	          	]
	          ]
	        }
	      }
	    }

    ]
  },
  mode: 'development',
  optimization: {
  	minimize: false
  }
};
