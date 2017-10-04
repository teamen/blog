const path = require('path');

// provide
const provide = {
    $: 'jquery',
    jQuery: 'jquery',
    'window.$': 'jquery',
    // Popper: 'popper.js',
    // poper: 'popper.js',
};


// alias
const resolve = {
    alias: {
        // vue$: 'vue/dist/vue.esm.js',
        // 'popper.js': 'popper.js/dist/umd/popper.js',
        // jquery: 'jquery',
        // swiper$: 'swiper/dist/js/swiper.module.js',
        // swiper$: 'swiper/src/swiper.js',
        // swiper$: 'swiper/dist/js/swiper.js', // for swiper 4.0
    },
};


// externals
const externals = {
    // 'jquery': 'window.jQuery',
    // jquery: 'jQuery',
    // dropzone: 'Dropzone',
};

module.exports = { provide, resolve, externals };
