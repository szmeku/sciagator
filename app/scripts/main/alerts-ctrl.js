'use strict';

angular.module('fanpagePosts')
    .controller('AlertsCtrl', function ($scope, $rootScope) {

        $scope.closeAlert = function (index) {
            $rootScope.alerts.splice(index, 1);
        };
    });