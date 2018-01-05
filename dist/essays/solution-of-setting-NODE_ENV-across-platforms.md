跨平台設置 NODE_ENV
2017-11-05 01:35:21

平日裡用 Mac 開發居多，使用到 webpack 的項目裡通常的 npm scripts 如下：
    
    "scripts": {
        "build": "NODE_ENV=production webpack -p --progress",
        "dev": "NODE_ENV=development webpack --watch --progress"
    },

<br>
卻發現在 windows 下， <em>webpack.config.js</em> 裡的 <em>process.env.NODE_ENV === 'production'</em> 的判斷不起作用。

查閱資料發現在 windows 下，需要安装 [cross-env](https://github.com/kentcdodds/cross-env)。

npm scripts 得如下配置:

    "scripts": {
        "build": "cross-env NODE_ENV=production webpack -p --progress"
    }

