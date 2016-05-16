/**
 * Created by moonsemina on 2016. 5. 16..
 */
'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.factory:commonUtil
 * @description
 * # commonUtil
 * factory of the portfolioApp
 */
angular.module('portfolioApp')
.factory('commonUtil', function () {
    return {
        changeMyPfBg : function(input, target){
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('.'+target).css('background-image', 'url('+e.target.result+')');
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
    }
});