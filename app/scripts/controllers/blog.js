/**
 * Created by moonsemina on 2016. 5. 13..
 */
'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
    .controller('BlogCtrl', function () {

        //Header Navigation Active, Hover Effect
        $('ul.blog-navbar-nav li').hover(
            function () {
                $(this).children('a').css('color','#e85d5b');
            },
            function () {
                $(this).children('a').css('color','#999');
            }
        );


        
    });
