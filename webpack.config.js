const path = require('path')

const HTMLPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const outPutPath = './dist'

const NODE_ENV = process.env.NODE_ENV || 'development'

const isDev = NODE_ENV === 'development'
const isProd = NODE_ENV === 'production'


module.exports = {
    entry: {
        bundle: ['@babel/polyfill', './example/index.tsx']
    },
    output: {
        path: path.resolve(__dirname, outPutPath)
    },
    devtool: isDev && 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        plugins: [new TsconfigPathsPlugin()]
    },
    optimization: {
        minimize: isProd
    },
    plugins: [
        new HTMLPlugin({
            template: './example/index.html',
            filename: 'index.html',
            chunks: ['bundle']
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ],
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, outPutPath),
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-typescript'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    }
}
