const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');

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
        
        // new WorkboxPlugin.InjectManifest({
        //     swSrc: path.join(process.cwd(), 'app/src/sw.js'),
        //     swDest: 'service-worker.js',
        //     exclude: [
        //       // /\.map$/,
        //         /manifest$/,
        //         //\.htaccess$/,
        //         /service-worker\.js$/,
        //         /sw\.js$/,
        //     ]
        // }),
    ],
};