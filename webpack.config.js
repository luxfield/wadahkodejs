const path = require('path');
//const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './app/index.js',
    output: {
        filename: 'uikit.js',
        path: path.resolve(__dirname, 'vendor/uikit/js')
    },
    mode: 'development',
    // Plugins
    plugins: [
        // new WorkboxPlugin.GenerateSW({
        //     clientsClaim: true,
        //     skipWaiting: true
        // }),
    ],
};