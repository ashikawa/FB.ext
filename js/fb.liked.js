/*jslint browser: true, plusplus: true, unparam:true*/
/*global jQuery, FB*/
/**
 * FB.deferred
 * 「いいね！」ボタンのイベント制御をするライブラリ
 */
(function ($) {
    'use strict';

    var init = window.fbAsyncInit || $.noop;

    function liked(id, create, remove, always) {

        create = create || $.noop;
        remove = remove || $.noop;
        always = always || $.noop;

        function callAPi() {
            FB.deferred.api('/me/likes/' + id).done(function (response) {
                if (response.data === '') {
                    remove();
                } else {
                    create();
                }
                always();
            });
        }

        FB.Event.subscribe('edge.create', function (response) {
            callAPi();
        });
        FB.Event.subscribe('edge.remove', function (response) {
            callAPi();
        });

        FB.deferred.login().done(function () {
            callAPi();
        });
    }

    window.fbAsyncInit = function () {
        FB.liked = liked;
        return init();
    };
}(jQuery));