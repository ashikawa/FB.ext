/*global FB, $, jQuery, console, window*/
(function () {
    'use strict';

    var init = function () {};

    if (window.fbAsyncInit) {
        init = window.fbAsyncInit;
    }

    window.fbAsyncInit = function () {

        // init the FB JS SDK
        FB.init({
            appId      : '269461469851305', // App ID from the App Dashboard
            status     : true, // check the login status upon init?
            cookie     : true, // set sessions cookies to allow your server to access the?
            xfbml      : true  // parse XFBML tags on this page?
        });

        init();
    };
}());

(function(d, debug){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
    ref.parentNode.insertBefore(js, ref);
}(document, /*debug*/ false));