/*
* Jasen Skipworth
* Contains functions needed for logging into the application on index.html
* 11/10/17
*/
(function () {
    "use strict";

    var dataTitle;

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        var adminLogin = ["admin", "ID10t!"];

        document.getElementById('login').addEventListener('click', function () {

            if (adminLogin[0].toLowerCase == document.getElementById("username").value.toLowerCase && adminLogin[1] === document.getElementById("password").value)
                location.replace('all.html');
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