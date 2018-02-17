const path = require('path'),
    HappyPack = require('happypack'),
    webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

const distPath = path.join(__dirname, '/public/assets/dist');
let pathsToClean = [
    'dist'
]

// the clean options to use
let cleanOptions = {
    root:     distPath,
    exclude:  [''],
    verbose:  true,
    dry:      false
}
module.exports = {
    context: __dirname,
    devtool: 'inline-source-map',
    entry: './src/main.ts'
    ,
    output: {
        path: distPath,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [path.resolve(__dirname, "node_modules")],
                use: 'happypack/loader?id=ts'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new webpack.HotModuleReplacementPlugin(),
        new HappyPack({
            id: 'ts',
            threads: 4,
            loaders: [
                {
                    path: 'ts-loader',
                    query: { happyPackMode: true }
                }
            ]
        })
    ]
}