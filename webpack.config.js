module.exports = {
    entry:'./app.js',
    output:{
       path: './build',
       filename:'bundle.js'

    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css" },
         { //会生成各种字体文件
               test: /\.(otf|eot|svg|ttf|woff)/,
               loader: 'url-loader?limit=8192'
         }  // 关于bootstrap字体的加载 https://github.com/webpack/webpack/issues/597
            // {  //直接内联4种字体，全部都在bundls.js 中  
            //    test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
            //    loader: 'url-loader'
            // }
        ]
    }
}