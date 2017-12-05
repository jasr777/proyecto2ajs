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


    /* Gif scope variables  */

    $scope.gifs= [];

    /* Comics scope variables */
    $scope.comics = [];

    /* Flags scope variables */

    $scope.editFlag =false;
    $scope.createFlag = true;

    $scope.dataFlag = true;
    $scope.gifsFlag = false;
    $scope.othersFlag= false;

    $scope.searchByTrendyFlag = false;
    $scope.searchByRecentFlag = false;

    ////////////////////////////////

    /* --- Scope Functions ---*/
    /* Users */
    $scope.createUser = createUser;
    $scope.removeUser = removeUser;
    $scope.editUser = editUser;
    $scope.updateUser = updateUser;

    /* Gif Related  */
    $scope.searchGif = searchGif;
   //$scope.searchByTrendy =searchByTrendy;
    $scope.addGif = addGif;

    /* Comic Related */

    $scope.searchComics = searchComics;

    /*Flags*/
    $scope.toggleDataFlag = toggleDataFlag;
    $scope.toggleGifsFlag= toggleGifsFlag;
    $scope.toggleOthersFlag = toggleOthersFlag;

    $scope.toggleSearchByRecentFlag = toggleSearchByRecentFlag;
    $scope.toggleSearchByTrendyFlag = toggleSearchByTrendyFlag;


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

        function toggleSearchByTrendyFlag(){
            $scope.searchByTrendyFlag = true;
            $scope.searchByRecentFlag = false;
        }

        function toggleSearchByRecentFlag(){
            $scope.searchByTrendyFlag = false;
            $scope.searchByRecentFlag = true;
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


        /* -- Giphy Related functions -- */

        function searchGif(query){

            if($scope.searchByRecentFlag){
                Giphy.findByRecent(query).then(setGifs).catch(commFailure);
                $scope.searchByRecentFlag = false;
            } else {                
                Giphy.findByTrendy(query).then(setGifs).catch(commFailure);
                $scope.searchByTrendyFlag = false;

            }

        }


        function setGifs(gifs){
            $scope.gifs = gifs.data;
            console.log("Gifs recibidos en controller");
            console.log($scope.gifs);
        }


      

        /* -- Favorite Gifs related functions -- */

        function addGif(gif){
            console.log(gif);
            $scope.newUser.gifs.push(gif);
            console.log($scope.newUser.gifs);
        }

        /*-- Comic related functions -- */

        function searchComics(query){
            Marvel.getComicsStartingWithQuery(query)
                  .then(setComics)
                  .catch(commFailure);



        }


        function setComics(comics){
            console.log("comics received in home controller");
            console.log(comics);
            $scope.comics = comics.data

        }

        /* -- Generic Error mesages function */

         function commFailure(){
            console.error("Ha habido un error de comunicación", error);
        }


        /*-- Auxiliary functions --*/


        function randId() {   
            return Math.random().toString(36).substr(2, 10);  
        }



    }
})();