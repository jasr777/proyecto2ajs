(function() {
    'use strict';
    angular
        .module('GeekAgenda')
        .controller('UserController', UserController);
    UserController.$inject = ['$scope','$routeParams','User'];
    /* @ngInject */
    function UserController($scope, $routeParams, User) {

    	$scope.user = {};


        activate();
        ////////////////
        function activate() {
        	let id = $routeParams.id;
        	console.log(id);
        	console.log(User.getUser(id));
        	$scope.user = User.getUser(id);
        }
    }
})();