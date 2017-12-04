(function() {
    'use strict';
    angular
        .module('GeekAgenda')
        .controller('HomeController', HomeController);
    HomeController.$inject = ['$scope','$routeParams','User','Giphy'];
    /* @ngInject */
    function HomeController($scope,$routeParams ,User, Giphy) {

    /* --- Scope Variables --- */


    /* User scope variables */
    $scope.users = [];
    $scope.newUser = {};


    /* Giphy scope variables  */

    $scope.gifs= [];

    /* Flags scope variables */

    $scope.editFlag =false;
    $scope.createFlag = true;

    $scope.dataFlag = true;
    $scope.gifsFlag = false;
    $scope.othersFlag= false;

    ////////////////////////////////
    /* --- Scope Functions ---*/
    /* Users */
    $scope.createUser = createUser;
    $scope.removeUser = removeUser;
    $scope.editUser = editUser;
    $scope.updateUser = updateUser;

    /* Giphy */

 
    /*Flags*/
    $scope.toggleDataFlag = toggleDataFlag;
    $scope.toggleGifsFlag= toggleGifsFlag;
    $scope.toggleOthersFlag = toggleOthersFlag;

    activate();
        ////////////////
        function activate() {
            $scope.users = User.getAll();
        }

        /* -- Flag Toggle Functions -- */


        function toggleDataFlag(){

            $scope.dataFlag = true;
            $scope.gifsFlag = false;
            $scope.othersFlag= false;
        }

        function toggleGifsFlag(){
            $scope.dataFlag = false;
            $scope.gifsFlag = true;
            $scope.othersFlag= false;
        }

        function toggleOthersFlag(){
            $scope.dataFlag = false;
            $scope.gifsFlag = false;
            $scope.othersFlag= true;
        }

        /* -- User related functions -- */

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
        /* - END USER FUNCTIONS - */


        /* -- Gif Related functions -- */

        function searchGif(query){
            $scope.gifs = Giphy.findByQuery(query);

        }


        /*-- Auxiliary functions --*/


        function randId() {   
            return Math.random().toString(36).substr(2, 10);  
        }



    }
})();