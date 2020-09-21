/**
 * Main script on js
 *
 * @author Daniel Palomino
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
//const baseURL = "http://192.168.0.5:3004"
const baseURL = "http://192.168.222.178:5001"
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
            "ok": 2,
            "high_temperature": 3
        },
        "state": 1,
        "punto_control_id": 0,
        "sede": "",
        "user_rfid": "",
        "name": "",
        "user_id": "",
        //"checked": false,
        "temp_selector": "1",
        "temperature": 36,
        "user_exists": true,
        "ninguno": true,
        "let_card": false,
        "idnetity_ok": true,
        "ingreso": true,
        "fiebre": false,
        "dolor_garganta": false,
        "congestion": false,
        "show_questions": true,
        "show_id": false,
        "tos": false,
        "dificultad_respirar": false,
        "escalofrio": false,
        "dolor_musculos": false,
        "fatiga": false,
        "live_with_covid": false,
        "contact_with_covid": false,
        "databse_id": -1,
        "error_messages": []
    },
    methods: {

        /**
         * When user push submit button, this method will be executed
         */
        onFormSubmit: function (submitEvent) {

            // show modal
            if (parseFloat(this.temperature) >= 38.0) {
                this.state = this.general_states["high_temeperature"]
            } else {
                this.state = this.general_states["waiting"]
            }

            $("#waitingModal").modal("show");

            try {

                if (this.user_exists == false) {
                    //if user does not exist his data is publish to the user db
                    console.log("reg user")
                    this.registerUser()
                }

                if(this.idnetity_ok==false){
                    console.log("wrong rfid assignation")
                    this.reportUserWithWrongCard()

                }


                this.temperature=Math.random()

                switch (this.temp_selector) {
                    case "1":
                        this.temperature*=3.5
                        this.temperature+=34.0
                        break;
                    case "2":
                        this.temperature*=0.5
                        this.temperature+=37.5
                        break;
                    case "3":
                        this.temperature+=38.0
                        break;
                }
                this.temperature=this.temperature.toFixed(2)



                if (this.ingreso == "true") {
                    this.ingreso = true
                } else {
                    this.ingreso = false
                }
                if (this.live_with_covid == "true") {
                    this.live_with_covid = true
                } else {
                    this.live_with_covid = false
                }
                if (this.contact_with_covid == "true") {
                    this.contact_with_covid = true
                } else {
                    this.contact_with_covid = false
                }

                // getting data
                var data = {
                    cedula: parseInt(this.user_id),
                    punto_control_id: parseInt(this.punto_control_id),
                    temperature: parseFloat(this.temperature),
                    ingreso: this.ingreso,
                    fiebre: this.fiebre,
                    dolor_garganta: this.dolor_garganta,
                    congestion: this.congestion,
                    tos: this.tos,
                    dificultad_respirar: this.dificultad_respirar,
                    escalofrio: this.escalofrio,
                    dolor_musculos: this.dolor_musculos,
                    fatiga: this.fatiga,
                    vive_covid: this.live_with_covid,
                    contacto_covid: this.contact_with_covid,

                }
                // validate data                           
                //validate_data(data)
                var url = baseURL + "/LogTemp"

                PRINT("publish")
                // making Post to setted url
                addTemperature(url, data, this.onResponsePublishTemperature)
                //addTemperature(settings["url_server"], data, this.onResponsePublishTemperature)

            } catch (error) {
                console.log("error")
                this.onError(error)
            }


            this.user_rfid = ""
            this.name = ""
            this.user_id = ""
            this.temperature = ""
            this.sede = ""
            this.user_exists = true
            location.reload()
            return false;
        },

        /**
         * Action when ok reponse for Users
         */
        onResponseGetUsers: function (response) {
            PRINT("users response is")
            PRINT(response)
            if (response.data.length == 0) {
                PRINT("User not registered")
                this.user_exists = false;
                this.show_id = true;
            }
            else {
                PRINT("User already registered")
                this.name = response.data[0].name
                this.user_id = response.data[0].cedula
                this.user_exists = true;
                this.databse_id=response.data[0].id
                PRINT(this.name)
                PRINT(this.user_id)

            }
            setTimeout(function () {
                $("#waitingModal").modal("hide");
            }, 500);

        },
        /**
         * Action when ok response for location
         */
        onResponseGetLocation: function (response) {
            PRINT("location response is")
            PRINT(response)
            if (response.data.length == 0) {
                PRINT("Location not registered")
                this.user_exists = false;
            }
            else {
                PRINT("Location registered")
                this.sede = response.data
                PRINT(this.sede)

            }
            setTimeout(function () {
                $("#waitingModal").modal("hide");
            }, 500);

        },

        /**
        * Action when ok response
        */
        onResponsePublishNewUser: function (response) {
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
            PRINT("response for publishing temperature is")
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
            }, 500);

        },

        /**
            * Action when ok response
            */
        onResponseModifyUser: function (response) {
            PRINT("response for modifying user is")
            PRINT(response)
            if (response.data.length == 0) {
                //if (!response) {
                //alert("Primero debe registrar su usuario")                
                
            }
            else {
                PRINT("User succesfully modified")
            }
            setTimeout(function () {
                $("#waitingModal").modal("hide");
            }, 500);

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
            this.punto_control_id = parseInt(this.sede)

            this.state = this.general_states["waiting"]
            $("#waitingModal").modal("show");

            var url = baseURL + "/Sedes?id=" + this.punto_control_id
            response_location = this.onResponseGetLocation
            axios.get(url)
                .then(function (response) {
                    response_location(response)
                })
                .catch(function (error) {
                    PRINT("Error on getting location data")
                    throw (error)
                })


            url = baseURL + "/Users?rfid_id=" + this.user_rfid +
                "&active=true"
            response_users = this.onResponseGetUsers
            axios.get(url)
                .then(function (response) {
                    response_users(response)
                })
                .catch(function (error) {
                    // handle error 
                    //this.state = this.general_states["error"]
                    //$("#waitingModal").modal("show");
                    PRINT("Error on getting data")
                    throw (error)
                })

            PRINT("Data verified")

        },
        registerUser: function () {

            //Add input validations

            //fill data if valide
            url = baseURL + "/Users"
            data = {
                name: this.name,
                cedula: parseInt(this.user_id),
                rfid_id: parseInt(this.user_rfid),
                active: true
            }
            // validate data                           
            validate_data_new_user(data)
            addUser(url, data, this.onResponsePublishNewUser)
        },
        reportUserWithWrongCard: function () {

            //Add input validations            

            //fill data if valide

            url = url = baseURL + "/WrongRfidUsers"
            data = {
                name: this.name,
                cedula: parseInt(this.user_id),
                rfid_id: parseInt(this.user_rfid),
                swapped_cedula: this.swapped_cedula
            }
            PRINT(data)
            addUser(url, data, this.onResponsePublishNewUser)

        },
        onSymptomsPicked: function () {
            this.ninguno = false
        },
        
        onIngresoChange: function () {
            PRINT(typeof (this.ingreso))
            if (this.ingreso == "true") {
                this.show_questions = true
            } else {
                this.show_questions = false

            }
        },
        onLetCardChange: function () {
            if (this.let_card == true) {
                this.show_id = true
                this.name=""
                this.user_id=""
            }else{
                this.show_id = false
            }
        },
        onIdCheckChange: function () {
            if (this.idnetity_ok == false) {
                this.show_id = true
                this.swapped_cedula = parseInt(this.user_id)
                this.name = ""
                this.user_id = ""
            } else {
                this.show_id = false
            }
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
 * function to get an url parameter (GET)
 * eg. http://example.com?id=1 
 * 
 *  getURIParam("id") => 1
 */

getURIParam = function (param) {
    return (new URLSearchParams(window.location.search)).get(param);
}

/**
 * helper to make post temperature to setted url
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
 * helper to make post new user to setted url
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
 * helper to make post new user to setted url
 * usign axios library https://github.com/axios/axios
 */
modifyUser = function (url, data, onResponseListener) {
    try {
        axios.patch(url, data)
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