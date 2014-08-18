'use strict';

angular.module('fanpagePosts', [
    'ngAnimate', "ngQuickDate",
    'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ui.bootstrap'
]).config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/settings');

        $stateProvider
            .state('settings', {
                url: "/settings",
                templateUrl: 'partials/settings.html',
                controller: 'SettingsCtrl'
            }).state('posts', {
                url: "/posts",
                templateUrl: 'partials/posts.html',
                controller: 'PostsCtrl',
                resolve: {
                    token: function() {
                        return Facebook.token.promise();
                    }
                }
            });

    }).run(
        ['$rootScope',
            function($rootScope) {

                $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {

                    $rootScope.alerts.push({
                        msg: error.responseJSON.error.message,
                        type: 'danger'
                    });
                });
            }
        ]);