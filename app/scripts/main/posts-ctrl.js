'use strict';

angular.module('fanpagePosts')
    .controller('PostsCtrl', function($rootScope, $scope, $filter, token) {

        var lastAdres = null;

        $scope.limit = 50;
        $scope.fanpageId = localStorage.getItem('facebookFanpageID');
        $scope.sqlStart = localStorage.getItem('sqlStart');
        $scope.sqlBody = localStorage.getItem('sqlBody');
        $scope.sqlEnd = localStorage.getItem('sqlEnd');

        $scope.updateSql = function() {
            localStorage.setItem('sqlStart', $scope.sqlStart);
            localStorage.setItem('sqlBody', $scope.sqlBody);
            localStorage.setItem('sqlEnd', $scope.sqlEnd);

            $scope.sqlResult = $scope.sqlStart || "";

            angular.forEach($scope.posts, function(post) {
                var body = $scope.sqlBody || "";

                angular.forEach(['created_time', 'message'], function(prop) {
                    body = body.replace("{{" + prop + "}}", mysql_real_escape_string(post[prop] || ""));
                });

                $scope.sqlResult += body;
            });


            $scope.sqlResult += $scope.sqlEnd || "";
        };

        $scope.loadPosts = function(adres) {
            var adres = adres || "https://graph.facebook.com/v2.1/" + $scope.fanpageId + "/posts?fields=message&limit=" + $scope.limit + "&access_token=" + token;

            var postsDefer = $.get(adres, function(resp) {
                $scope.posts = resp.data;
                $scope.previous = (resp.paging && resp.paging.previous) || lastAdres;
                $scope.next = (resp.paging && resp.paging.next) || lastAdres;
                $scope.updateSql();
                $scope.$apply();


                lastAdres = adres;
            });

            postsDefer.fail(function(resp, type, msg) {

                $rootScope.alerts.push({
                    type: 'danger',
                    msg: resp.responseJSON.error.message || msg
                });
                $rootScope.$apply();
            });
        };

        $scope.saveFanpageId = function(fanpageId) {
            localStorage.setItem('facebookFanpageID', fanpageId);
        };


        function mysql_real_escape_string(str) {
            return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function(char) {
                switch (char) {
                    case "\0":
                        return "\\0";
                    case "\x08":
                        return "\\b";
                    case "\x09":
                        return "\\t";
                    case "\x1a":
                        return "\\z";
                    case "\n":
                        return "\\n";
                    case "\r":
                        return "\\r";
                    case "\"":
                    case "'":
                    case "\\":
                    case "%":
                        return "\\" + char; // prepends a backslash to backslash, percent,
                        // and double/single quotes
                }
            });
        }

    });