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
//const baseURL = "http://localhost:3004"
const baseURL = "http://192.168.0.11:3004"
//const baseURL = "http://192.168.222.150:5000"
//

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
        //"checked": false,
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
            this.state = this.general_states["waiting"]
            $("#waitingModal").modal("show");

            try {
                // validate data                           
                //validate_data(data)
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
                var url = baseURL + "/LogTemp"
                url = settings["url_server"]
                
                console.log("publish")

                // making Post to setted url
                addTemperature(url, data, this.onResponsePublishTemperature)
                //addTemperature(settings["url_server"], data, this.onResponsePublishTemperature)

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
            this.user_exists=true
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
                PRINT("User not registered")
                //alert("Primero debe registrar su usuario")
                this.user_exists = false;
            }
            else {
                PRINT("User already registered")
                this.name = response.data[0].name
                this.user_id = response.data[0].cedula
                //this.name = response.data.name                
                //this.user_id = response.data.cedula
                this.user_exists = true;
                PRINT(this.name)
                PRINT(this.cedula)
                /*this.$nextTick(() => {
                    this.$refs.name.$el.focus();
                    this.$refs.name.$el.select();
                })*/

            }
            //this.state = this.general_states["waiting"]
            /*setTimeout(function () {
                $("#waitingModal").modal("hide");
            }, 300);*/
            /*PRINT("hide modal")
            if (this.user_exists) {
                this.$nextTick(() => {
                    this.$refs.temperature.$el.focus();
                    this.$refs.temperature.select();
                })
            }*/


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
            //if (!response) {
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
            //if (!response) {
                //alert("Primero debe registrar su usuario")                
                PRINT("Temperature could not be saved")
            }
            else {
                PRINT("Temperature saved")
            }
            setTimeout(function () {
                $("#waitingModal").modal("hide");
            }, 300);

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
            this.state = this.general_states["waiting"]
            //$("#waitingModal").modal("show");
            var url = baseURL + "/Users?rfid_id=" + this.user_rfid
            response_ = this.onResponseGet
            axios.get(url)
                .then(function (response) {
                    response_(response)
                })
                .catch(function (error) {
                    // handle error 
                    //this.state = this.general_states["error"]
                    //$("#waitingModal").modal("show");
                    PRINT("Error on getting data")
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
            // validate data                           
            validate_data_new_user(data)
            addUser(url, data, this.onResponsePublishNewUser)
        }

    }


});

//  Helpers!!

/**
 * function to validate data  using library validate.js 
 * http://validatejs.org/
 */

validate_data_new_user = function (data_to_validate, invalidDataListener) {
    

    var constraints = {
        "cedula": {
            presence: { allowEmpty: false },
            /*length: {
                minimum: 1,
                maximum: 40
            }*/
        },
        "rfid_id": {
            presence: { allowEmpty: false },
            /*length: {   
                minimum: 1,
                maximum: 40
            }*/
        }
        
    }

    error_message = validate(data_to_validate, constraints);

    if (error_message != null) {
        PRINT("Invalid data")
        PRINT(error_message)
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