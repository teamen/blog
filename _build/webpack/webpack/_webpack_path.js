// REQUIRE
const path = require('path');

const webpackPath = {};

// env
webpackPath.isDll = process.env.NODE_ENV === 'dll';
webpackPath.isDist = process.env.NODE_ENV === 'production';
webpackPath.isDistPrefix = webpackPath.isDist ? '' : '____';
webpackPath.isChunkhash = webpackPath.isDist ? '_[chunkhash]' : '_devvvvvvvvvvvvvvvv';

// config
// 如果 webpack_path 放在非根目录下，这里需要注意加 ../
webpackPath.PUBLIC_DIR_PATH = path.resolve(__dirname, '../../../dist');
webpackPath.RESOURCE_DIR_PATH = path.resolve(__dirname, '../../../src');
webpackPath.STATICS_DIR_PATH = path.resolve(__dirname, '../../../dist/statics');
webpackPath.STATICS_CDN_PATH = '/statics';

// dll
webpackPath.DLL_DIR_NAME = 'vendor';
webpackPath.DLL_DIR_PATH = `${webpackPath.STATICS_DIR_PATH}/${webpackPath.DLL_DIR_NAME}`;
webpackPath.DLL_CDN_PATH = `${webpackPath.STATICS_CDN_PATH}/${webpackPath.DLL_DIR_NAME}`;
webpackPath.DLL_BUNDLE_JSON_FILE = `${webpackPath.DLL_DIR_PATH}/bundle.json`;

// ini
webpackPath.THEME_SHARE_STATICS_INI = `${webpackPath.STATICS_DIR_PATH}/statics.ini`;
webpackPath.THEME_SHARE_BUNDLE_INI = `${webpackPath.STATICS_DIR_PATH}/vendor/bundle.ini`;

// console.log(webpackPath);
console.log('\n\n');

// tips
console.log(`-------------------- WEBPACK ${(webpackPath.isDist ? 'PRD' : 'DEV')} --------------------`);
console.log(`isDistPrefix: ${webpackPath.isDistPrefix}`);
console.log(`isChunkhash : ${webpackPath.isChunkhash}`);

module.exports = webpackPath;
