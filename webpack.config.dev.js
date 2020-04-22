const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports =  {
    mode: "development",
    entry: "./showcase/index.tsx",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            }
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".scss"],
    },
    output: {
        crossOriginLoading: "anonymous",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "React Base Forms Showcase",
            filename: "index.html",
            template: "index.html"
        })
    ],
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        }
    }
};
