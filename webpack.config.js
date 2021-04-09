const path = require("path");
const webpack = require("webpack");


module.exports =  function(env, argv) {
    const mode = env.mode ? "production" : "development";
    return {
        mode,
        entry: argv["entry"],
        devtool: env.mode ? "inline-source-map" : "eval",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: [/node_modules/, path.resolve(__dirname, "./showcase")],
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
            filename: argv["output-filename"],
            path: path.resolve(__dirname, argv["output-path"]),
            library: "react-bare-lib",
            libraryTarget: "umd",
        },
        plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /react-day-picker$/),]
    };
};
