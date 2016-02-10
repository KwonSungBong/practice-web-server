var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
	        './public/index'
    ],
    output: {
    	path: path.join(__dirname, 'public'),
    	filename: 'bundle.js',
    	publicPath: '/static'
    },
    module: {
    	loaders: [{
    		test:/\.js$/,
    		loaders: ['babel'],
    		exclude: /node_modules/,
    		include: __dirname
    	},{
    		test:/\.css?$/,
    		loaders: ['style','raw'],
    		include: __dirname
    	}]
    }
};

