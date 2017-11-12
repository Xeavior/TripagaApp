/*
* Jasen Skipworth
* Contains functions needed navigating tabs, logging out, and displaying data
* for all.html and favorites.html
* 11/11/17
*/
(function () {
    "use strict";

    var dataTitle;

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
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

        var dataNodes = 2;
        var dataEntries = 2;
        var HTML = '';
        var favStorage = window.localStorage;
        
        dataTitle = [ 'Water Pressure Gauge', 'Oil Flow Rate'];
        var dataType = ['Pressure', 'Moving Volume'];
        var dataAmount = ['123456 lbs/in^2','123445 in^3/sec'];

        HTML = '<table id="dataNode"> ';
        for (var i = 0; i < dataNodes; i++) {
            HTML += '<tr> <th id="title"> ' + dataTitle[i] + ' </th><th id="star"><img src="../common/EmptyStar.png" alt="Favorite Star" height="18px" class="favorite"></th></tr>';
            for (var c = 0; c < dataEntries; c++) {
                HTML += '<tr> <td> ' + dataType[c] + ' </td> <td id="dataAmount"> ' + dataAmount[c] + ' </td> </tr>';
            }
        }
        app.innerHTML = HTML + ' </table>';

        //Handle selecting favorites
        var favorites = document.getElementsByClassName('favorite');
        for (var k = 0; k < dataNodes; k++) {
            (function () {
                var favoriteStar = favorites[k];
                var dataNodeName = dataTitle[k];
                favorites[k].addEventListener('click', function () { favoriteItem(favoriteStar, dataNodeName, favStorage); });
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
    function favoriteItem(favorite, title, favStorage) {
        if (favorite.src == "http://localhost:4400/common/EmptyStar.png") {
            favorite.src = "http://localhost:4400/common/FilledStar.png";
            //alert(title + ' has been favorited');
            createFavoriteStorage(favorite, title, favStorage)
        }
        else {
            favorite.src = "http://localhost:4400/common/EmptyStar.png";
            //alert(title + ' has been unfavorited');
            removeFavoriteStorage(title, favStorage)
        }
    };

    function createFavoriteStorage(favorite, title, favStorage) {

        for (var j = 0; j < favorite.length; j++)
        {
            if (favorite.src == "http://localhost:4400/common/FilledStar.png") {
                favStorage.setItem(favorite, title);
            }
        }

    };

    function removeFavoriteStorage(favorite, favStorage)
    {
        favStorage.removeItem(favorite);
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();