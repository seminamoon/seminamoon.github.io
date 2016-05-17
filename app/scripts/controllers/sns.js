/**
 * Created by moonsemina on 2016. 5. 16..
 */
'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:SnsCtrl
 * @description
 * # SnsCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
    .controller('SnsCtrl', function ($scope, commonUtil) {
        $scope.searchKeyword = '';
        $scope.searchBar = false;
        $scope.searchClick = function(){
            $scope.searchBar = !$scope.searchBar;
            $('.sns-search-keyword').animate({width: 'toggle'});
        };

        $('.my-photo').hover(
            function(){
                $('.photo-change-btn').fadeIn().css('display','block');
            },
            function(){
                $('.photo-change-btn').css('display','none');
            }
        );

        $scope.targetBg = false;
        $scope.targetPhoto = false;
        $scope.changeIma = function(input, target){
            commonUtil.changeMyPfBg(input, target);
            if(target == 'my-info'){
                $('.bg-change-btn').click();
            }else{
                $('.photo-change-btn').click();
            }
        };

        $scope.controlOn = true;
        $scope.closeSimpleWrite = function(){
            $scope.controlOn = !$scope.controlOn;
            $('.simple-write-content').animate({height: 'toggle'});
        };

    });
