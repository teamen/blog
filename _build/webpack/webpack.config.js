// REQUIRE
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackPath = require('./webpack/_webpack_path');
const webpackModule = require('./webpack/_webpack_module');
const webpackPlugin = require('./webpack/_webpack_plugin');
const webpackShimming = require('./webpack/_webpack_shimming');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackFileList = require('webpack-file-list-plugin');

const WebpackInsertChunksPlugin = require('./plugins/webpack-insert-chunks-plugin/index');


const dllBundleJsonFile = require(webpackPath.DLL_BUNDLE_JSON_FILE);

if (webpackPath.isDist) {
    // 先清除掉之前的文件
    webpackPlugin.push(
        new CleanWebpackPlugin([
            `${webpackPath.isDistPrefix}scripts`,
            `${webpackPath.isDistPrefix}styles`,
            'statics.ini',
            // `${webpackPath.isDistPrefix}views`,
        ], {
            root: webpackPath.STATICS_DIR_PATH,
            verbose: true,
            dry: false,
        }),
    );
}

const isDll = (process.env.npm_config_argv).indexOf('dlllllllllllllllllllllllllll') !== -1;

// 调用 DLL
webpackPlugin.push(
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: dllBundleJsonFile,
    }),
);


// 生成 替换 check
webpackPlugin.push(
    new WebpackInsertChunksPlugin({
        webpackPath,
        includeMap: false,
        iniFile: webpackPath.THEME_SHARE_STATICS_INI,
    }),
);


// 打包 css 样式
webpackPlugin.push(new ExtractTextPlugin({
    filename: `${webpackPath.isDistPrefix}styles/[name]${webpackPath.isChunkhash}.css`,
}));


// 输出 html
// webpackPlugin.push(
//     new HtmlWebpackPlugin({
//         // title: key,
//         inject: false,
//         filename: webpackPath.THEME_LAYOUT_MASTER_FILENAME,
//         template: webpackPath.THEME_LAYOUT_MASTER_TEMPLATE,
//         bundle: `${webpackPath.DLL_CDN_PATH}/${dllBundleJsonFile.name}.js`,
//         hash: webpackPath.isDist,
//         webpackPath,
//         // minify: {
//         //     removeComments: true,
//         //     collapseWhitespace: true,
//         // },
//     })
// );
//
// const devServerConfig = {
//     contentBase: webpackPath.PUBLIC_DIR_PATH,
//     host: 'localhost',
//     port: 9999,
//     hot: true,
//     inline: true,
//     overlay: false,
//     quiet: true,
//     // host: '0.0.0.0',
//     proxy: {
//         '*': {
//             target: 'http://www.tapole.xxx',
//             changeOrigin: true,
//         },
//     },
//     open: true,
//     openPage: (webpackPath.isDist ? '' : ''),
//     disableHostCheck: true,
//     watchContentBase: true,
//     historyApiFallback: true,
//     noInfo: true,
//     // watchOptions: {
//     //     aggregateTimeout: 300,
//     //     poll: 1000,
//     // },
//     headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
//         'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
//     },
// };


const webpackConfig = {
    entry: {
        app: path.resolve('src/app.js'),
    },
    // devServer: devServerConfig,
    output: {
        path: webpackPath.STATICS_DIR_PATH,
        publicPath: webpackPath.STATICS_CDN_PATH,
        filename: `${webpackPath.isDistPrefix}scripts/[name]${webpackPath.isChunkhash}.js`,
        chunkFilename: `${webpackPath.isDistPrefix}scripts/[name]${webpackPath.isChunkhash}.js`,
        sourceMapFilename: `${webpackPath.isDistPrefix}scripts/[name]${webpackPath.isChunkhash}.js.map`,
    },
    // watch: !isDll,
    watch: false,
    devtool: webpackPath.isDist ? false : 'cheap-source-map',
    // devtool: false,
    resolve: webpackShimming.resolve,
    module: webpackModule,
    plugins: webpackPlugin,
    externals: webpackShimming.externals,
};

module.exports = webpackConfig;

