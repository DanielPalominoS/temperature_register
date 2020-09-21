const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management 
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
//mix.setPublicPath('../public')

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');

/*
mix.js('resources/js/app.js', 'public_html/js')
   .sass('resources/sass/app.scss', 'public_html/css');*/
   
/*var browserSync = require("browser-sync").create();
browserSync.init({
    server: './public', watch: true 
   });*/
<<<<<<< HEAD


   
=======
>>>>>>> test_v2
