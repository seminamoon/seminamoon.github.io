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
                changeMyPfBg: function (input, target) {
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            $('.' + target).css('background-image', 'url(' + e.target.result + ')');
                        };
                        reader.readAsDataURL(input.files[0]);
                    }
                }
            }
        }
    )
    .filter('elapsedTimeFilter', function () {
        return function (date) {
            var duration = moment.duration(moment().diff(date));
            var years = duration.years();
            var months = duration.months();
            var weeks = duration.weeks();
            var days = duration.days();
            var hours = duration.hours();
            var minutes = duration.minutes();
            var seconds = duration.seconds();
            var result;
            if (years > 0) {
                result = years + '년';
            } else if (months > 0) {
                result = months + '달';
            } else if (weeks > 0) {
                result = weeks + '주';
            } else if (days > 0) {
                result = days + '일';
            } else if (hours > 0) {
                result = hours + '시간';
            } else if (minutes > 0) {
                result = minutes + '분';
            } else {
                result = seconds + '초';
            }
            return result;
        }
    })
    .filter('countStyleCheck', function () {
        return function (count) {
            var result = count > 0 ? '#7ACCBE' : '#999';
            return result;
        }
    });