

var listOfCommits = angular.module('listOfCommits', []);

listOfCommits.controller('listOfCommits', function($scope, $http) {

        $http({

            method: "GET",
            url: '/getCommits',
            params: {name: $scope.name, orgName: $scope.orgName}


        }).success(function (data){

            if(data.status == "200")
            $scope.commits = data.info;

            else
            alert("No commits found ");

        }).error(function (error) {
            alert(error);
        });


});
