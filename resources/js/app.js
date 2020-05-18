/**
 * Main script on js
 *
 * @author Camilo Gomez
 */


// inlcuding libraries
require('./bootstrap');


// Vue Components
//Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.directive('focus', {
    // When the bound element is inserted into the DOM...
    inserted: function (el) {
        // Focus the element
        el.focus()
    }
})

//Consts
const baseURL = "http://localhost:3000"
//const baseURL = "http://192.168.222.150:5000"


// Implementing Vue JS

const app = new Vue({
    el: '#app',
    data: {
        // initial data 
        "general_states": {
            "error": 0,
            "waiting": 1,
            "ok": 2
        },
        "state": 1,
        "user_rfid": "",
        "name": "",
        "user_id": "",
        "checked": false,
        "temperature": "",
        "user_exists": true,
        "error_messages": []
    },
    methods: {

        /**
         * When user push submit button, this method will be executed
         */
        onFormSubmit: function (submitEvent) {

            // show modal  
            /*this.state = this.general_states["waiting"]
            $("#waitingModal").modal("show");*/

            try {
                if (this.user_exists == false) {
                    //if user does not exist his data is publish to the user db
                    console.log("reg user")
                    this.register_user()
                }

                // getting data
                var data = {
                    "user_id": this.user_id,
                    "temperature": this.temperature,
                }

                // validate data                           
                //validate_data(data)
                console.log("publish")

                // making Post to setted url
                addTemperature(settings["url_server"], data, this.onResponsePublishTemperature)

                // redirecting
                //redirect(settings["redirect"])

            } catch (error) {
                console.log("error")
                this.onError(error)
            }
            this.user_rfid = ""
            this.name = ""
            this.user_id = ""
            this.temperature = ""
            //$("#waitingModal").modal("hide");
            //this.force-this.$forceUpdate()
            //location.reload()
            //PRINT("reaload")            
            return false;
        },

        /**
         * Action when ok response
         */
        onResponseGet: function (response) {
            //this.state = this.general_states["waiting"]
            //$("#waitingModal").modal("show");
            PRINT("response is")
            PRINT(response)
            if (response.data.length == 0) {
                //alert("Primero debe registrar su usuario")
                this.user_exists = false;
            }
            else {
                this.name = response.data[0].name
                this.user_id = response.data[0].cedula
                this.user_exists = true;
                /*this.$nextTick(() => {
                    this.$refs.name.$el.focus();
                    this.$refs.name.$el.select();
                })*/
            }
            //this.state = this.general_states["waiting"]
            //$("#waitingModal").modal("hide");
            //$("#waitingModal").hide();

        },

        /**
        * Action when ok response
        */
        onResponsePublishNewUser: function (response) {
            // handle success
            // handle success
            PRINT("response for publishing temperature is")
            PRINT(response)
            if (response.data.length == 0) {
                //alert("Primero debe registrar su usuario")
                PRINT("User could not be added")
            }
            else {
                PRINT("User successfully added")
            }

        },

        /**
            * Action when ok response
            */
        onResponsePublishTemperature: function (response) {            
            PRINT("response for publishing new user is")
            PRINT(response)
            if (response.data.length == 0) {
                //alert("Primero debe registrar su usuario")                
                PRINT("Temperature could not be saved")
            }
            else {
                PRINT("Temperature saved")
            }
            // handle success

        },


        /***
         * Action when error response
         */
        onError: function (error) {
            PRINT(error)
            this.state = this.general_states["error"]
        },

        /***
        * Action when rfid_id_input change
        */
        verifyUser: function (event) {

            var url = baseURL + "/Users?rfid_id=" + this.user_rfid
            axios.get(url)
                .then(function (response) {
                    app.onResponseGet(response)
                })
                .catch(function (error) {
                    // handle error 
                    throw (error)
                })

        },
        register_user: function () {

            //Add input validations

            //fill data if valide
            url = baseURL + "/Users"
            data = {
                name: this.name,
                cedula: parseInt(this.user_id),
                rfid_id: parseInt(this.user_rfid)
            }
            addUser(url, data, this.onResponsePublishNewUser)
        }

    }


});

//  Helpers!!

/**
 * function to validate data  using library validate.js 
 * http://validatejs.org/
 */

validate_data = function (data_to_validate, invalidDataListener) {


    var constraints = {
        "user_id": {
            presence: { allowEmpty: false },
            length: {
                minimum: 1,
                maximum: 36
            }
        },
        "temperature": {
            presence: { allowEmpty: false },
            length: {
                minimum: 1,
                maximum: 36
            }

        }
    }

    error_message = validate(data_to_validate, constraints);

    if (error_message != null) {
        throw (error_message)
    }


};

/**
 * to redirect
 */
redirect = function (url) {
    setTimeout(function () {
        window.location.replace(url);
    }, 2000);
}

/**
 * function to get an url parameter (GET)
 * eg. http://example.com?id=1 
 * 
 *  getURIParam("id") => 1
 */

getURIParam = function (param) {
    return (new URLSearchParams(window.location.search)).get(param);
}

/**
 * helper to make post to setted url
 * usign axios library https://github.com/axios/axios
 */
addTemperature = function (url, data, onResponseListener) {

    axios.post(url, data)
        .then(function (response) {
            // handle success
            onResponseListener(response)
        })
        .catch(function (error) {
            // handle error 
            throw (error)
        })
}

/**
 * helper to make post to setted url
 * usign axios library https://github.com/axios/axios
 */
addUser = function (url, data, onResponseListener) {
    try {
        axios.post(url, data)
            .then(function (response) {
                onResponseListener(response)
            }).catch(function (error) {
                // handle error 
                throw (error)
            })
    } catch (e) {
        PRINT(e)
    }
}

/**
 * For debuging
 */

PRINT = function (param) {
    if (settings["debug"]) {
        console.log(param)
    }
}