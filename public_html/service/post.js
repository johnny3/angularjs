app.factory('PostFactory', function ($http, $q, $timeout) {
    var factory = {
        posts: false,
        getPosts: function () {
            var deferred = $q.defer();
            if (factory.posts !== false) {
                deferred.resolve(factory.posts);
            } else {
                $http.get('posts.json').
                        success(function (data) {
                            factory.posts = data;
                            $timeout(function () {
                                deferred.resolve(factory.posts);
                            }, 2000);
                        }).
                        error(function () {
                            deferred.reject('Impossible de récupérer les articles');
                        });
            }

            return deferred.promise;
        },
        getPost: function (id) {
            var post = {};
            var deferred = $q.defer();
            var posts = factory.getPosts().then(function (posts) {
                angular.forEach(posts, function (value, key) {
                    if (value.id === id) {
                        post = value;
                    }
                });
                deferred.resolve(post);
            }, function (msg) {
                alert(msg);
            });
            return deferred.promise;
        }
    }
    return factory;
});