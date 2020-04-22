const path = require("path");

module.exports =  function(env, argv) {
    return {
        mode: env.production ? "production" : "development",
        entry: argv["entry"],
        devtool: env.production ? "inline-source-map" : "eval",
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
            extensions: [".tsx", ".ts", ".scss", ".css"],
        },
        output: {
            filename: argv["output-filename"],
            path: path.resolve(__dirname, argv["output-path"]),
            library: "react-bare-lib",
            libraryTarget: "umd",
        },
    };
};
