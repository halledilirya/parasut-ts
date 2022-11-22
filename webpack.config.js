const path = require('path');
const nodeExternals = require('webpack-node-externals');

const {
    NODE_ENV = 'production',
} = process.env;

module.exports = {
    entry: './src/index.ts',
    mode: "production",
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        library: 'parasut',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        roots: [path.resolve(__dirname, "src")],
        alias: {
            '@': path.resolve(__dirname),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader'
                ]
            }
        ]
    }
}