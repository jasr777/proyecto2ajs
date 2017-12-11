    (function() {
    'use strict';
    angular
        .module('GeekAgenda')
        .controller('HomeController', HomeController);
    HomeController.$inject = ['$scope','$routeParams','User','Giphy','Marvel'];
    /* @ngInject */
    function HomeController($scope,$routeParams ,User, Giphy, Marvel) {

    /* --- Scope Variables --- */


    /* User scope variables */
    $scope.users = [];
    $scope.newUser = {};
    $scope.newUser.gifs = []; 
    $scope.newUser.comics = [];  


    /* Gif scope variables  */
/*
    $scope.gifs= [];
    $scope.gifOffset = 0;
  */
    /* Flags scope variables */

    $scope.editFlag =false;
    $scope.createFlag = true;

    $scope.dataFlag = true;
    $scope.gifsFlag = false;
    $scope.othersFlag= false;

   
 
    /* Auxiliary variables */

    

    ////////////////////////////////

    /* --- Scope Functions ---*/
    /* Users */
    $scope.createUser = createUser;
    $scope.removeUser = removeUser;
    $scope.editUser = editUser;
    $scope.updateUser = updateUser;



    /* Gif Related  *//*
    $scope.searchGif = searchGif;
    $scope.addGif = addGif;
    $scope.nextGifs = nextGifs;
    $scope.previousGifs = previousGifs;

    /* Comic Related */

    /*Flags*/
    $scope.toggleDataFlag = toggleDataFlag;
    $scope.toggleGifsFlag= toggleGifsFlag;
    $scope.toggleOthersFlag = toggleOthersFlag;
/*
    $scope.toggleSearchByRecentFlag = toggleSearchByRecentFlag;
    $scope.toggleSearchByTrendyFlag = toggleSearchByTrendyFlag;
*/
    $scope.searchResults = false;


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
            $scope.showFavGifsFlag = false;
            $scope.gifs = [];
            $scope.searchResults = false;


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
            User.update(user);
            $scope.users = User.getAll();
            $scope.editFlag = false;
            $scope.createFlag = true;
            $scope.newUser = {};
        }
        /* - END USER FUNCTIONS - */



      
        /* -- Generic Error mesages function */

       


        /*-- Auxiliary functions --*/


        function randId() {   
            return Math.random().toString(36).substr(2, 10);  
        }






    }
})();