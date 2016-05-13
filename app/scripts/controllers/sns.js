/**
 * Created by moonsemina on 2016. 5. 13..
 */
'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:MainCtrl
 * @description
 * # SnsCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
    .controller('SnsCtrl', function () {

        //Header Navigation Active, Hover Effect
        $('ul.sns-navbar-nav li').hover(
            function () {
                $(this).children('a').css('color','#e85d5b');
            },
            function () {
                $(this).children('a').css('color','#999');
            }
        );


        
    });
