// REQUIRE
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackPath = require('./_webpack_path');

const webpackModule = {};

webpackModule.rules = [
    {
        test: /\.jsx?$/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015'],
                    ],
                    plugins: ['transform-runtime'],
                },
            },
        ],
        exclude: /node_modules/,
    },
    {
        test: /\.vue$/,
        use: [
            {
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader',
                    },
                },
            },
        ],
    },
    {
        test: /\.art$/,
        use: [
            {
                loader: 'art-template-loader',
                options: {
                },
            },
        ],
    },
    {
        test: /\.scss|sass|css$/,
        use: ExtractTextPlugin.extract({
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        // importLoaders: 1,
                        minimize: webpackPath.isDist,
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            require('autoprefixer')({
                                browsers: [
                                    'ie>=9',
                                    '>1% in CN',
                                ],
                            }),
                        ],
                    },
                },
                {
                    loader: 'sass-loader',
                },
            ],
            fallback: 'style-loader',
        }),
    },
    {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 512,
                    name: 'images/[name].[ext]?ver=[hash:8]',
                },
            },
        ],
    },
    {
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 512,
                    name: 'fonts/[name].[ext]?ver=[hash:8]',
                },
            },
        ],
    },
];


module.exports = webpackModule;

