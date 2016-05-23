

var getUserInformation = angular.module('getUserInformation', []);

getUserInformation.controller('userInformation', function($scope, $http) {

    $http({

        method: "GET",
        url: '/getUserInformation',
        params : {user: $scope.user}


    }).success(function (data) {


            if(data.status == 200) {

                    if (data.info.email == null) {

                        data.info.email = "N/A";
                    }

            $scope.name = data.info.login;
            $scope.avatar_url = data.info.avatar_url;
            $scope.url = data.info.html_url;
            $scope.email = data.info.email;
            $scope.publicRepos = data.info.public_repos;
            $scope.followers = data.info.followers;
            $scope.following = data.info.following;
        }
        else
            alert("Could not fetch the user profile");


    }).error(function (error) {
        alert(error);
    });


});
