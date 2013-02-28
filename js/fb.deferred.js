/*jslint browser:true*/
/*global jQuery, FB*/
(function ($) {
    'use strict';

    var init = window.fbAsyncInit || $.noop;

    /**
     * FacebookAPI の Deferred ラッパー
     * 可変引数 (FB.api にそのまま渡す)
     */
    function api() {

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

    /**
     * FB.login の Deferred ラッパー
     */
    function login() {
        var $dfd = $.Deferred(function ($dfd) {

            var scope  = {};

            FB.getLoginStatus(function (response) {

                if (response.status === 'connected') {
                    $dfd.resolve(response);
                    return;
                }

                FB.login(function (response) {
                    if (response.authResponse) {
                        $dfd.resolve(response);
                        return;
                    }
                    $dfd.reject(response);
                }, scope);
            });

        });

        return $dfd.promise();
    }

    window.fbAsyncInit = function () {
        FB.deferred = {
            api: api,
            login: login
        };

        return init();
    };
}(jQuery));