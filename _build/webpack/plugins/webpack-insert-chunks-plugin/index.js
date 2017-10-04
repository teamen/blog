const fs = require('fs');
const path = require('path');

function WebpackInsertChunksPlugin(options) {
    this.options = options;
}

WebpackInsertChunksPlugin.prototype.apply = function (compiler) {
    const _this = this;
    const INI_FILE = _this.options.iniFile;
    let STATICS_CDN_PATH = _this.options.webpackPath.STATICS_CDN_PATH;

    if (_this.options.isDll) {
        STATICS_CDN_PATH = `${STATICS_CDN_PATH}/vendor`;
    }

    function forceMkdir(filePath) {
        const dirname = path.dirname(filePath);

        if (fs.existsSync(dirname)) {
            return true;
        }

        forceMkdir(dirname);
        fs.mkdirSync(dirname);

        return false;
    }

    // https://doc.webpack-china.org/api/plugins/compiler
    compiler.plugin('after-emit', function (compilation, callback) {
        let iniData = '';

        compilation.chunks.forEach(function (chunk) {
            iniData += `\n\n[${chunk.name}]\n`;

            chunk.files.forEach(function (filename) {
                if (filename.endsWith('css')) {
                    iniData += `css = ${STATICS_CDN_PATH}/${filename}\n`;
                } else if (filename.endsWith('css.map') &&
                    _this.options.includeMap
                ) {
                    iniData += `cssMap = ${STATICS_CDN_PATH}/${filename}\n`;
                } else if (filename.endsWith('js')) {
                    iniData += `js = ${STATICS_CDN_PATH}/${filename}\n`;
                } else if (filename.endsWith('js.map') &&
                    _this.options.includeMap
                ) {
                    iniData += `jsMap = ${STATICS_CDN_PATH}/${filename}\n`;
                }
            });
        });


        forceMkdir(INI_FILE);

        fs.writeFile(INI_FILE, iniData, 'utf8', function (writeFileError) {
            if (writeFileError) {
                return console.log(writeFileError);
            }

            return false;
        });

        // fs.readFile(masterBladeFile, 'utf8', function (readFileError, data) {
        //     if (readFileError) {
        //         return console.log(readFileError);
        //     }
        //     // var result = data.replace(/string to be replaced/g, 'replacement');
        //     const result = data.replace(
        //         '<!-- STATIC-FILE-LIST-PLACEHOLDER -->',
        //         `<?php $staticFileList = ${staticFileList}; ?>`,
        //     );
        //
        //     fs.writeFile(masterBladeFile, result, 'utf8', function (writeFileError) {
        //         if (writeFileError) {
        //             return console.log(writeFileError);
        //         }
        //
        //         return false;
        //     });
        //
        //     return false;
        // });
        //


        callback();
    });
};

module.exports = WebpackInsertChunksPlugin;
