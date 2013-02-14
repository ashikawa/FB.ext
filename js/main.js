/*global FB, $, jQuery, console, fbDeferred, window*/
(function () {
    'use strict';

    // 遅延初期化
    var callMutualfriends = function (data) {

        var reccomendedLength     = 40,
            $reccomendedTmpl      = $('#reccomended-tmpl'),
            $reccomendedContainer = $('#reccomended-container');

        function lazyFunc(data) {

            $.each(data, function (i, element) {
                var id   = element.id,
                    $dfd = fbDeferred.api('/' + id + '/mutualfriends?fields=id');

                $dfd.done(function (response) {

                    var length = response.data.length;

                    if (length <= reccomendedLength) {
                        return;
                    }

                    $reccomendedTmpl.tmpl(element)
                        .appendTo($reccomendedContainer);
                });
            });
        }

        lazyFunc(data);
        callMutualfriends = lazyFunc;
    };

    function setupFriendsBox() {

        var $login                = fbDeferred.login(),
            friendsApiLimit       = 10,
            $friendsTmpl          = $('#friends-tmpl'),
            $friendsContainer     = $('#friends-container');


        // !!! PROCESS !!!!!
        function callFriends(offset) {

            var limit = friendsApiLimit,
                $friendsDfd;

            if (offset === undefined) {
                offset = 0;
            }

            $friendsDfd = fbDeferred
                .api('/me/friends?fields=name,picture&offset=' + offset +  '&limit=' + limit);

            $friendsDfd.done(function (response) {

                if (!response.data.length) {
                    return;
                }

                $friendsTmpl.tmpl(response.data)
                    .appendTo($friendsContainer);

                offset += limit;

                if (response.data.length === limit) {
                    callFriends(offset); //recursive
                }
            });

            $friendsDfd.done(function (response) {
                callMutualfriends(response.data);
            });

            $friendsDfd.done(function (response) {
                console.log(response);
            });
        }

        $login.done(function (response) {
            callFriends();
        });
    }

    function eventify() {

        function openFeedDialog(id) {

            FB.ui({
                method: 'feed',
                to: id,
                // to: ['1576428973', '1275738399'],
                name: 'Sample Feed Dialog',
                caption: 'Sample Caption',
                description: 'Sample Description',
                link: 'http://ja.wikipedia.org/wiki/%E3%83%9A%E3%83%B3%E3%82%AE%E3%83%B3',
                picture: 'http://ngm.nationalgeographic.com/2012/11/emperor-penguins' +
                    '/img/02-airborne-penguin-exits-water_1600.jpg'
            }, function (response) {
                if (response && response.post_id) {
                    console.log('Post was published.');
                } else {
                    console.log('Post was not published.');
                }
            });
        }

        $('.friends-box').on('click', 'li', function (event) {
            var id = $(this).attr('data-id');
            openFeedDialog(id);
            return false;
        });
    }

    window.fbAsyncInit = function () {
        setupFriendsBox();
        eventify();
    };
}());
