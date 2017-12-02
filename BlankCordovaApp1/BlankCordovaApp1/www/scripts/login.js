/*
* Jasen Skipworth
* Contains functions needed for logging into the application on index.html
* 12/1/17
*/
(function () {
    "use strict";

    var dataTitle, adminLogin;


    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        adminLogin = ["admin", "ID10t!"];

        document.getElementById('login').addEventListener('click', function () {
            if ((adminLogin[1] === document.getElementById("password").value) && (adminLogin[0] == document.getElementById("username").value.toLowerCase()))
                location.replace('all.html');
            else {
                document.getElementById("loginAttemptNote").innerHTML = '<p id="invalidLogin"> Username or Password was incorrect please try again </p>';
                document.getElementById("password").value = '';
                document.getElementById("username").value = '';
            }
        });

        document.getElementById("username").addEventListener("keypress", function (event) {
            if (event.keyCode === 13) {
                document.getElementById("password").focus();
                event.preventDefault();
            }
        });

        document.getElementById("password").addEventListener("keypress", function (event) {
            if (event.keyCode === 13) {
                if ((adminLogin[1] === document.getElementById("password").value) && (adminLogin[0] == document.getElementById("username").value.toLowerCase()))
                    location.replace('all.html');
                else {
                    document.getElementById("loginAttemptNote").innerHTML = '<p id="invalidLogin"> Username or Password was incorrect please try again </p>';
                    document.getElementById("password").value = '';
                    document.getElementById("username").value = '';
                }
                event.preventDefault();
            }
        });

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');


        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();