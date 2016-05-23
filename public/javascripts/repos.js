

var listOfRepos = angular.module('listOfRepos', []);

listOfRepos.controller('listOfRepos', function($scope, $http) {

    $scope.commits = function(name) {
        $http({

            method: "GET",
            url: '/commits',
            params : {repoName : name}

        });
    }


            $http({

                method: "GET",
                url: '/listOfRepos',
                params: {orgName : $scope.name}

            }).success(function (data) {

                if(data.status == 200) {
                    for (var i = 0; i < data.info.length; i++) {
                        if (data.info[i].language == null) {

                            data.info[i].language = "N/A";
                        }
                    }
                    $scope.repos = data.info;
                }
                else{
                    alert("No repos found !");
                }

            }).error(function (error) {
                alert("Error" +error);
            });
    });