/*
* Jasen Skipworth, Kevin Rogers
* Contains functions needed navigating tabs, logging out, and displaying data
* for all.html and favorites.html
* 11/15/17
*/
(function () {
    "use strict";

    var dataNodes = 3;
    var dataEntries = 2;
    var HTML = '';
    var favStorage = window.localStorage;
    var dataTitle = ['Water Pressure Gauge', 'Oil Flow Rate', 'Test'];
    var dataType = ['Pressure', 'Moving Volume'];
    var dataAmount = ['123456 lbs/in^2', '123445 in^3/sec'];

    //var app (put here so can use with favorites)

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        //Handle selecting logout by presenting confirmation dialog box
        document.getElementById('logout').addEventListener('click', function () {
            var flag = confirm("Are you sure you want to logout?");

            if (flag)
                location.replace('index.html');

        });

        var allTab = document.getElementById("allTab");
        var favTab = document.getElementById("favTab");

        allTab.addEventListener("click", function () {
            if (location.pathname != "/all.html")
                location.replace('all.html')
        });

        favTab.addEventListener("click", function () {
            if (location.pathname != "/favorites.html")
                location.replace('favorites.html');
        });

        if (location.pathname === "/favorites.html") {
            if (document.getElementById("active") != null)
                document.getElementById("active").id = "allTab";
            favTab.id = "active";
        }

        if (location.pathname === "/all.html") {
            if (document.getElementById("active") != null)
                document.getElementById("active").id = "favTab";
            allTab.id = "active";
        }
        //html code generator for code display
        var app = document.getElementById('app');

        //check if storage exists for data title. create one at 0 if does not exist
        dataTitle.forEach(function (currentValue) {
            if (favStorage.getItem(currentValue) == null)
                console.log("new item added");
        });

        if (location.pathname == "/all.html") {
            HTML = '<table id="dataNode"> ';
            for (var i = 0; i < dataNodes; i++) {
                if (favStorage.getItem(dataTitle[i]) == "1")
                    HTML += '<tr> <th id="title"> ' + dataTitle[i] + ' </th><th id="star"><img src="../common/FilledStar.png" alt="Favorite Star" height="18px" class="favorite"></th></tr>';
                else
                    HTML += '<tr> <th id="title"> ' + dataTitle[i] + ' </th><th id="star"><img src="../common/EmptyStar.png" alt="Favorite Star" height="18px" class="favorite"></th></tr>';
                for (var c = 0; c < dataEntries; c++) {
                    HTML += '<tr> <td> ' + dataType[c] + ' </td> <td id="dataAmount"> ' + dataAmount[c] + ' </td> </tr>';
                }
            }
            app.innerHTML = HTML + ' </table>';
        }

        if (location.pathname == "/favorites.html") {
            generateFavorites();
        }


        //Handle selecting favorites
        var favorites = document.getElementsByClassName('favorite');
        for (var k = 0; k < dataNodes; k++) {
            (function () {
                var favoriteStar = favorites[k];
                var dataNodeName = dataTitle[k];
                favorites[k].addEventListener('click', function () {
                    favoriteItem(favoriteStar, dataNodeName);
                });
            }());
        }

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');


        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    };

    //function toggles favorite's stars
    //TODO: add flag to indicate a foavorited item and have it display on the favorites tab  
    function favoriteItem(favorite, title) {
        if (favorite.src == "http://localhost:4400/common/EmptyStar.png") {
            favorite.src = "http://localhost:4400/common/FilledStar.png";
            //alert(title + ' has been favorited');
            favStorage.setItem(title, 1);
        }
        else {
            favorite.src = "http://localhost:4400/common/EmptyStar.png";
            //alert(title + ' has been unfavorited');
            favStorage.setItem(title, 0);
            //call function to build favorites
            if (location.pathname == "/favorites.html")
                generateFavorites();

        }
    };

    function generateFavorites() {
        HTML = '<table id="dataNode"> ';
        for (var i = 0; i < dataNodes; i++) {
            if (favStorage.getItem(dataTitle[i]) == "1"){
                HTML += '<tr> <th id="title"> ' + dataTitle[i] + ' </th><th id="star"><img src="../common/FilledStar.png" alt="Favorite Star" height="18px" class="favorite"></th></tr>';
                for (var c = 0; c < dataEntries; c++) {
                    HTML += '<tr> <td> ' + dataType[c] + ' </td> <td id="dataAmount"> ' + dataAmount[c] + ' </td> </tr>';
                }
            }
        }
        app.innerHTML = HTML + ' </table>';

        var favorites = document.getElementsByClassName('favorite');
        for (var k = 0; k < favorites.length; k++) {
            (function () {
                var favoriteStar = favorites[k];
                var dataNodeName = ;
                favorites[k].addEventListener('click', function () {
                    favoriteItem(favoriteStar, dataNodeName);
                });
            }());
        }
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();