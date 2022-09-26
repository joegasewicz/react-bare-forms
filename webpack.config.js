const path = require("path");
const webpack = require("webpack");


module.exports =  function(env, argv) {
    // const mode = env.mode ? "production" : "development";
    return {
        // mode,
        mode: "development",
        // entry: argv["entry"],
        entry: "./src/index.ts",
        devtool: env.mode ? "inline-source-map" : "eval",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                }
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".css"],
        },
        externals: ["react", "react-dom"],
        output: {
            filename: "index.js",
            path: path.resolve(__dirname, "dist"),
            library: "react-bare-forms",
            libraryTarget: "umd"
        },
        plugins: [
            // new webpack.IgnorePlugin({
            //     resourceRegExp: /^\.\/locale$/,
            //     contextRegExp: /react-day-picker$/,
            // }),
        ]
    };
};
