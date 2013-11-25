# FB.ext

Facebook JavaScript SDK の拡張

### FB.deferred.login()

FB.login の $.Deferred ラーッパー

*Usage*: FB.deferred.login()  
*Returns*: $.Deferred

### Example

    FB.deferred.login().done(function () {
        ...
    });

## FB.deferred.api()

FB.api の $.Deferred ラッパー

*Usage*: FB.deferred.api(path, method, params)  

* **path** facebook graph api path
* **method** *Optional* get / post
* **params** *Optional* post or get paramators

*Returns*: $.Deferred

### Example

    FB.deferred.api('/me').done(function (responce) {
        ...
    });

### FB.liked

ページに「いいね！」されているか判定する

*Usage*: FB.liked(pageid)  

* **pageid** facebook page id

*Returns*: $.Deferred
