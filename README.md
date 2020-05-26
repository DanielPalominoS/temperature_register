# CRUZ VERDE - LOGIN PLATFORM

Framework developped by Jeffrey Way for be used on Laravel
- https://github.com/JeffreyWay/laravel-mix
- https://laravel.com/docs/7.x/mix

## Requirements

- Node JS     v8.10.0
- npm         3.5.2

## Libraries

| Library /Framework | WebSite  | Description|
|-------------|--------------------------------|---------------------------------------------------------------|
| Vue JS      | https://vuejs.org/             | is a progressive framework for building user interfaces.  Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. |
| Boostrap    | https://getbootstrap.com/      | For web design, usefull for responsive site Build responsive, mobile-first projects on the web with the world’s most popular front-end component library.       |
| axios       | https://github.com/axios/axios | Handles the HTTP Request                                                                                                                                        |
| validate.js | https://validatejs.org/        | Validates the data before sending to backend                                                                                                                    |


## Guide

1. Clone directory and go to the folder
2. Run `npm install` to install JS dependencies. It will create a new folder **node_modules**
3. Modify what you need
   1. For JS go to **resources/js**
   2. For CSS go to **resources/css**
   3. For HTML go to **public/**
4. Run  `npm run dev` for `npm run watch`  developpe mode 
5. Run  `npm run prod` for production mode



## Directory

    ├── doc
    ├── package.json          
    ├── public
    │   ├── css/
    │   ├── images/
    │   ├── index.html
    │   └── js/
    ├── README.md
    ├── resources
    │   ├── js
    │   │   ├── app.js
    │   │   ├── bootstrap.js
    │   │   └── components
    │   └── sass
    │       ├── app.scss
    │       └── _variables.scss
    └── webpack.mix.js             


## Inputs / Outputs

|I/O| variable | Where  | Description|
|----|----|-----|----|
| input |session_id |  on_url |   it will be resended to backend |
|----|----|-----|----|
| output | user | on post  data |  string user input|
| output | password | on post data | string password input |
| output | remember_me | on post data | boolean |
| output | session_id | on post data | the same as recieved on url |
|----|----|-----|----|
|input| status | on post response | To identify if user/password are valid, the expected answer have to be "ok", other will asume the user and password inputs are wrong |