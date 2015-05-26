app.controller('CommentsCtrl', function ($scope, PostFactory, $routeParams) {
    $scope.loading = true;
    var post = PostFactory.getPost(parseInt($routeParams.id, 10)).then(function (post) {
        $scope.loading = false;
        $scope.title = post.name;
        $scope.comments = post.comments;
    }, function (msg) {
        alert(msg);
    });
});