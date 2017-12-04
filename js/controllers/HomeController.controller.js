(function() {
    'use strict';
    angular
        .module('GeekAgenda')
        .controller('HomeController', HomeController);
    HomeController.$inject = ['$scope','User'];
    /* @ngInject */
    function HomeController($scope, User) {

    /* --- Scope Variables --- */
    $scope.users = [];
    $scope.newUser = {};

    $scope.editFlag =false;
    $scope.createFlag = true;
    /* --- Scope Functions ---*/
    $scope.createUser = createUser;
    $scope.removeUser = removeUser;
    $scope.editUser = editUser;
    $scope.updateUser = updateUser;

    activate();
        ////////////////
        function activate() {
            $scope.users = User.getAll();
        }


        function createUser(user){
            user.id = randId();
            User.add(user);
            $scope.users = User.getAll();
            $scope.newUser = {};

        }

        function removeUser(id){
            User.remove(id);
            $scope.users= User.getAll();


        }

        function editUser(user){
            $scope.createFlag = false;
            $scope.editFlag =true;
            $scope.newUser.id = user.id;
            $scope.newUser.name = user.name;
            $scope.newUser.mail = user.mail;
            $scope.newUser.phone = user.phone;
            $scope.newUser.photo = user.photo;

        }

        function updateUser(user){
            console.log("update user en controller");
            console.log(user);
            User.update(user);
            $scope.users = User.getAll();
            $scope.editFlag = false;
            $scope.createFlag = true;
            $scope.newUser = {};
        }



        /*-- Auxiliary functions --*/


        function randId() {   
            return Math.random().toString(36).substr(2, 10);  
        }



    }
})();