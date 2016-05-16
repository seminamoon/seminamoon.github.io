'use strict';

/**
 * @ngdoc overview
 * @name portfolioApp
 * @description
 * # portfolioApp
 *
 * Main module of the application.
 */
angular
    .module('portfolioApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .when('/sns', {
                templateUrl: 'views/sns.html',
                controller: 'SnsCtrl',
                controllerAs: 'sns'
            })
            .when('/blog', {
                templateUrl: 'views/blog.html',
                controller: 'BlogCtrl',
                controllerAs: 'blog'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
