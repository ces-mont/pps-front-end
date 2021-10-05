const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require ("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: './src/index.js',
    output: {
        filename:'bundle.[hash].js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/i,
                use: 'babel-loader',
                exclude: /node_modules/,
                resolve: {extensions: ['.js','.jsx']}
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template:'./public/index.html'}),
        new CleanWebpackPlugin()
    ]
}