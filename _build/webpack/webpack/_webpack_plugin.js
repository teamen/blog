// REQUIRE
const webpack = require('webpack');
const webpackPath = require('./_webpack_path');
const webpackShimming = require('./_webpack_shimming');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');


// PLUGIN
const pluginList = [];

// 全局 shimming
pluginList.push(
    new webpack.ProvidePlugin(webpackShimming.provide)
);

// pluginList.push(
//     new ExtractTextPlugin('styles.css'),
// );

// BANNER
const bannerString = `ver. ${new Date().getTime()} - WayneTse <294881599@qq.com>`;

pluginList.push(
    new webpack.BannerPlugin(bannerString)
);

pluginList.push(
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
);

// Scope Hoisting-作用域提升
pluginList.push(
    new webpack.optimize.ModuleConcatenationPlugin()
);


if (webpackPath.isDist) {
    console.log('NODE_ENV    : production');
    // 部署 PLUGIN
    pluginList.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            },
        })
    );
} else {
    console.log('NODE_ENV    : development');
    // 开发 PLUGIN
    pluginList.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            },
        }),
    );
}

console.log('-----------------------------------------------------');


module.exports = pluginList;
