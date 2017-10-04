const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackPath = require('./webpack/_webpack_path');
const webpackModule = require('./webpack/_webpack_module');
const webpackPlugin = require('./webpack/_webpack_plugin');
const webpackShimming = require('./webpack/_webpack_shimming');

const WebpackInsertChunksPlugin = require('./plugins/webpack-insert-chunks-plugin/index');


// 先清除掉之前的文件
webpackPlugin.push(
    new CleanWebpackPlugin([
        // `${webpackPath.isDistPrefix}vendor`,
        'vendor',
    ], {
        root: webpackPath.STATICS_DIR_PATH,
    }),
);

// 生成 替换 check
webpackPlugin.push(
    new WebpackInsertChunksPlugin({
        webpackPath,
        includeMap: false,
        iniFile: webpackPath.THEME_SHARE_BUNDLE_INI,
        isDll: true,
    }),
);

// DLL
webpackPlugin.push(
    new webpack.DllPlugin({
        path: webpackPath.DLL_BUNDLE_JSON_FILE,
        name: '[name]_[chunkhash]',
        context: __dirname,
    }),
);


module.exports = {
    // 也可以设置多个入口，多个vendor，就可以生成多个bundle
    entry: {
        bundle: [
            // 'vue/dist/vue.esm.js',
            // 'vue-router/dist/vue-router.esm.js',
            // 'vuex/dist/vuex.esm.js',
            // 'element-ui',
            // 'lodash',

            'jquery',

            // 'normalize.css',
            // 'popper.js',
            // 'headroom.js',
            // '@cmyee/pushy/js/pushy.js',
            // 'swiper',
            // 'tether',
            // 'bootstrap',
        ],
    },
    // 输出文件的名称和路径
    output: {
        path: webpackPath.DLL_DIR_PATH,
        publicPath: webpackPath.STATICS_CDN_PATH,
        filename: '[name]_[chunkhash].js',
        library: '[name]_[chunkhash]',
    },
    plugins: webpackPlugin,
    module: webpackModule,
    resolve: webpackShimming.resolve,
};
