const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        index: './frontend/js/index.js',     
        loginregistro: './frontend/js/loginregistro.js',   
        darkMode: './frontend/js/darkMode.js',   
    },
    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env', "@babel/preset-react"],
                        plugins: ["@babel/plugin-syntax-jsx"]
                    }
                }
            },
    		{
				exclude: /node_modules/,
    			test: /\.css$/,
    			use: ['style-loader', 'css-loader'],
     		}
        ]
    },
    devtool: 'source-map'
};