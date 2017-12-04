(function() {
    'use strict';
    angular.module('GeekAgenda', ['ngRoute']).config(config);    
    
    config.$inject=['$routeProvider'];
    
    function config($routeProvider){
        
        $routeProvider.when("/" , {
            controller : 'HomeController',
            templateUrl : '/views/home.html'
        })

        .when("/user/:id" , {
        	controller:'UserController',
        	templateUrl :'/views/user.html'
        })
        
         
    }

})();