// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators:
// launch your app, set breakpoints, and then run "window.location.reload()"
// in the JavaScript Console.

/* ============================= Page states ================================ */
(function () {
    "use strict";

    document.addEventListener('deviceready',
        onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova has been loaded. Perform any initialization that
        //       requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended.
        // Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated.
        // Restore application state here.
    };
})();
/* ========================================================================== */

/* ============================== Functions ================================= */
function createPost(data) { //title, content, lastUpdate, appendTo, primaryColor) {
    // Variables
    var elPost = document.getTemplate("post"),
        elHeader = elPost.getElementsByTagName("header")[0],
        elTitle = elHeader.getElementsByTagName("h2")[0],
        elIcon = elHeader.getElementsByClassName("icon")[0],
        elMain = elPost.getElementsByTagName("main")[0],
        elFooter = elPost.getElementsByTagName("footer")[0],
        elLastUpdate = elFooter.getElementsByTagName("span")[1];

    // Set colors
    elHeader.style.background = data.primaryColor;
    elTitle.style.color = "white";

    // Set title
    if (data.title)
        elTitle.innerHTML = data.title;

    // Set main
    if (data.content) {
        if (typeof (data.content) == "string") {
            elMain.innerHTML = data.content;
        } else if (Array.isArray(data.content)) {
            for (var iContent in data.content) {
                elMain.appendChild(data.content[i]);
            }
        } else {
            elMain.appendChild(data.content);
        }
    }

    // Set lastUpdate
    if (data.lastUpdate) {
        elLastUpdate.innerHTML = data.lastUpdate.niceFormat();
    } else if (data.lastUpdate == false) {
        elPost.removeChild(elFooter);
    }

    // Set deleteAble
    if (typeof (data.deleteAble) != "undefined" && data.deleteAble == false) {
        elHeader.removeChild(elIcon);
    } else {
        elIcon.addEventListener("click", function () {
            data.appendTo.removeChild(elPost);
        });
    }

    // Append to
    data.appendTo.appendChild(elPost);
}

/* ########################################################################## */

function createFeed(title, content, info, appendTo, primaryColor) {
    var elFeed = document.getTemplate("feed"),
        elTitle = elFeed.getElementsByTagName("header")[0],
        elConent = elFeed.getElementsByTagName("main")[0],
        elInfo = elFeed.getElementsByTagName("footer")[0];

    // Set colors
    elTitle.style.color = primaryColor;

    // Set data
    elTitle.innerHTML = title;
    elConent.innerHTML = content;
    if (info) {
        elInfo.innerHTML = info;
    } else if (info == false) {
        elFeed.removeChild(elInfo);
    }

    // Append to
    appendTo.appendChild(elFeed);
}

/* ########################################################################## */

function createPostFromStorage(name) {
    var data = JSON.parse(window.localStorage[name]);
}
/* ========================================================================== */