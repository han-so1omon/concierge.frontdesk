const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const SRC_DIRECTORY = path.join(__dirname, 'src')

const config = {
    entry: [ path.resolve(__dirname, 'src/index.js') ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    //mode: 'development',
    resolve: {
        modules: [ path.resolve('node_modules'), 'node_modules' ]
    },
    performance: {
        hints: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(SRC_DIRECTORY, 'index.html')
        }),
        new CopyWebpackPlugin([
            { from: path.join(SRC_DIRECTORY, 'assets'), to: path.join(__dirname, 'build') }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/react']
                        }
                    }
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|pdf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'build'),
        port: 8080,
        host: '0.0.0.0'
    },
    devtool: 'inline-source-map'
}

module.exports = config
