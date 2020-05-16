/**
 * Charging libraries
 *
 * @author Camilo Gomez
 */


// useful for arrays
//window._ = require('lodash');


// Library for validation data
window.validate = require('validate.js');


// framework
window.Vue = require('vue');


// Boostrap
try {
    window.Popper = require('popper.js'); 
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

// Library with internet stuffs
window.axios = require('axios');

//window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/*
// for csrf tocken
let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found');
}
*/


