const path = require('path');

module.exports = {
    entry: './src/assets/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'./dist'),
        publicPath: 'dist/',
    },
    module: {
        rules: [{
            test: /\.(png|jpg)$/,
            use: [
                'file-loader'
            ]
        }]
    }
}
