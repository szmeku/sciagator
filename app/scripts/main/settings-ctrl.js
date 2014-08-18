'use strict';

angular.module('fanpagePosts')
    .controller('SettingsCtrl', function ($scope, $rootScope) {

        $scope.appId = localStorage.getItem('facebookAppId');
        $scope.appSecret = localStorage.getItem('facebookAppSecret');

        $scope.saveSettings = function () {
            localStorage.setItem('facebookAppId', $scope.appId);
            localStorage.setItem('facebookAppSecret', $scope.appSecret);

            $rootScope.alerts.push({
                msg: 'Ustawienia zapisane!',
                type: 'success'
            });
        };
    });