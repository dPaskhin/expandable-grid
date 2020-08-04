const path = require('path');

const HTMLPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

const outPutPath = './lib';

const NODE_ENV = process.env.NODE_ENV || 'development';

const isDev = NODE_ENV === 'development';
const isProd = NODE_ENV === 'production';

const getEntries = () => {
    if (isDev) {
        return {
            example: ['@babel/polyfill', './example/index.tsx'],
        };
    }

    return {
        expandableGrid: ['@babel/polyfill', './src/ExpandableGrid.tsx'],
    };
};

module.exports = {
    entry: getEntries(),
    output: {
        path: path.resolve(__dirname, outPutPath),
    },
    devtool: 'source-map',
    watch: isDev,
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        plugins: [new TsconfigPathsPlugin()],
    },
    optimization: {
        minimize: isProd,
    },
    plugins: [
        ...(isDev
            ? [new HTMLPlugin({
                template: './example/index.html',
                filename: 'index.html',
                chunks: ['example'],
            })]
            : []
        ),
        ...(!isDev ? [new CleanWebpackPlugin()] : []),
        new MiniCssExtractPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        hot: true,
        disableHostCheck: true,
        contentBase: path.resolve(__dirname, outPutPath),
        historyApiFallback: true,
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
                                '@babel/preset-typescript',
                            ],
                        },
                    },
                ],
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
                            '@babel/preset-typescript',
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
        ],
    },
};
