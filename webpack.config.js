var path = require('path');

module.exports = {
    entry: './app/index.js',
    output: {
        filename: 'uikit.js',
        path: path.resolve(__dirname, 'vendor/uikit/js')
    },
    mode: 'development',
};