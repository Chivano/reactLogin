const path = require('path');
module.exports = {
    entry: './src/js/index.js',
    devServer : {
      contentBase : "./dist"
    },
    module: {
       
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                  {
                    loader: 'babel-loader',
                    options: {
                      presets:['env','react']
                    }
                  }
                ]
              }
          
        ]
      },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
      }
  };