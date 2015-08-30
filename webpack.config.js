module.exports = {
	entry:'./app.js',
	output:{
		path: './build',
		filename:'bundle.js'

	},
    module: {
	    loaders: [
	        {test: /\.css$/, loader: "style!css" },
  			{
                test: /\.(otf|eot|svg|ttf|woff)/,
                loader: 'url-loader?limit=8192'
            }
	    ]
	}
}