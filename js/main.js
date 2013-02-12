/*global FB, $, jQuery, console*/
window.fbAsyncInit = function() {
    'use strict';

    // init the FB JS SDK
    FB.init({
        appId      : '269461469851305', // App ID from the App Dashboard
        status     : true, // check the login status upon init?
        cookie     : true, // set sessions cookies to allow your server to access the?
        xfbml      : true  // parse XFBML tags on this page?
    });

    var scope  = {scope: 'friends_likes'},
        $login;

    $login = $.Deferred(function ($dfd) {
        FB.login(function (response) {
            if (response.authResponse) {
                $dfd.resolve(response);
            } else {
                $dfd.reject(response);
            }
        }, scope);
    }).promise();

    function fbDfd() {

        var $dfd = $.Deferred(),
            args = [],
            i;

        for (i = 0; i < arguments.length; i++) {
            args[i] = arguments[i];
        }

        args.push(function (response) {
            if (!response || response.error) {
                $dfd.reject(response);
            } else {
                $dfd.resolve(response);
            }
        });

        FB.api.apply({}, args);

        return $dfd.promise();
    }

    var limit  = 10,
        offset = 0,
        $friendsTmpl = $('#friends-tmpl');

    function callFriendsDfd() {
// friends_likes
        var $dfd = fbDfd('me/friends?fields=name,picture&offset=' + offset +  '&limit=' + limit);

        $dfd.done(function (response) {

            if (!response.data.length) {
                return;
            }

            $friendsTmpl.tmpl(response.data)
                .appendTo('#friends-container');

            offset = offset + limit;

            if (response.data.length == limit) {
                callFriendsDfd(); //recursive
            }
        });

        $dfd.done(function (response){
            console.log(response);
        });

        return $dfd;
    }

    $login.done(function (response) {
        return callFriendsDfd();
    });

    $('#friends-container').on('click', 'li', function (event) {
        var id = $(this).attr('data-id');

        FB.ui({
            method: 'feed',
            to: id,
            // to: ['1576428973', '1275738399'],
            name: 'Sample Feed Dialog',
            caption: 'Sample Caption',
            description: 'Sample Description',
            link: 'http://ja.wikipedia.org/wiki/%E3%83%9A%E3%83%B3%E3%82%AE%E3%83%B3',
            picture: 'http://ngm.nationalgeographic.com/2012/11/emperor-penguins/img/02-airborne-penguin-exits-water_1600.jpg'
        }, function (response) {
            if (response && response.post_id) {
                console.log('Post was published.');
            } else {
                console.log('Post was not published.');
            }
        });
    });
};

(function(d, debug){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
    ref.parentNode.insertBefore(js, ref);
}(document, /*debug*/ false));