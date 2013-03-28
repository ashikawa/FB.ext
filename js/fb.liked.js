/*jslint browser:true*/
/*global jQuery, FB*/
/**
 * FB.deferred
 * 「いいね！」ボタンのイベント制御をするライブラリ
 */
(function ($) {
    'use strict';

    var init = window.fbAsyncInit || $.noop;

    function searchId(id, data) {
        var length = data.length,
            i;

        for (i = 0; i < length; i++) {
            if (data[i].id === id) {
                return true;
            }
        }
        return false;
    }

    function liked(id, create, remove, always) {

        create = create || $.noop;
        remove = remove || $.noop;
        always = always || $.noop;

        function callAPi() {
            FB.deferred.api('/me/likes?fields=id').done(function (response) {
                var liked = searchId(id, response.data);

                if (liked) {
                    create();
                } else {
                    remove();
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