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

    $scope.gifs= [];
    $scope.gifOffset = 0;
    /* Comics scope variables */
    $scope.comics = [];
    $scope.comicsOffset = 0;
    /* Flags scope variables */

    $scope.editFlag =false;
    $scope.createFlag = true;

    $scope.dataFlag = true;
    $scope.gifsFlag = false;
    $scope.othersFlag= false;

    $scope.showFavGifsFlag = false;
    $scope.searchByTrendyFlag = false;
    $scope.searchByRecentFlag = true;
    $scope.hiddenBlockFlag =true;   
    $scope.nextGifFlag = false;
    
/*
    $scope.showFavComicsFlag = false;
    $scope.nextComicFlag = false;

    $scope.hasComics = false;
*/

    /* Auxiliary variables */

    

    ////////////////////////////////

    /* --- Scope Functions ---*/
    /* Users */
    $scope.createUser = createUser;
    $scope.removeUser = removeUser;
    $scope.editUser = editUser;
    $scope.updateUser = updateUser;



    /* Gif Related  */
    $scope.searchGif = searchGif;
    $scope.addGif = addGif;
    $scope.nextGifs = nextGifs;
    $scope.previousGifs = previousGifs;

    /* Comic Related */

    /*Flags*/
    $scope.toggleDataFlag = toggleDataFlag;
    $scope.toggleGifsFlag= toggleGifsFlag;
    $scope.toggleOthersFlag = toggleOthersFlag;

    $scope.toggleSearchByRecentFlag = toggleSearchByRecentFlag;
    $scope.toggleSearchByTrendyFlag = toggleSearchByTrendyFlag;

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

        function toggleSearchByTrendyFlag(){
            console.log("search by trendy flag on")

            $scope.searchByTrendyFlag = true;
            $scope.searchByRecentFlag = false;
        }

        function toggleSearchByRecentFlag(){
            console.log("search by recent flag on")
            $scope.searchByTrendyFlag = false;
            $scope.searchByRecentFlag = true;
            console.log("search by recent is " + $scope.searchByRecentFlag);
        }

        /* -- User related functions -- */

        function createUser(user){
            user.id = randId();

            User.add(user);
            $scope.users = User.getAll();

            $scope.newUser = {};
            $scope.showFavComicsFlag = false;
            $scope.showFavGifsFlag = false;
            $scope.gifs = [];
            $scope.comics = [];
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


        /* -- Giphy Related functions -- */

        function searchGif(query){
            $scope.searchResults = true;

            if($scope.searchByRecentFlag && !$scope.searchByTrendyFlag){

                Giphy.find(query).then(setGifs).catch(commFailure);
            } else {                
                Giphy.find(query).then(setGifs).catch(commFailure);
            }


        }

        function nextGifs(query){
            $scope.gifOffset = $scope.gifOffset + 8;           
            Giphy.findByOffset(query,$scope.gifOffset).then(setGifs).catch(commFailure);
            $scope.hiddenBlockFlag = false;
        }

        function previousGifs(query){
            $scope.gifOffset = $scope.gifOffset - 8;
            Giphy.findByOffset(query,$scope.gifOffset).then(setGifs).catch(commFailure);
            
        }


        function setGifs(gifs){
            let gifsReceived = gifs.data.splice(0);
            if($scope.gifOffset < gifs.pagination.total_count){
                console.log($scope.gifOffset + "  " + gifs.pagination.total_count);
                if ( $scope.searchByRecentFlag){
                    $scope.gifs = Giphy.parseGifsList(gifsReceived,true);
                    console.log($scope.gifs);
                } else{
                    $scope.gifs = Giphy.parseGifsList(gifsReceived, false);
                }
             $scope.nextGifFlag = true;

            } else {
                console.log("llego al limite");
                $scope.nextGifFlag = false;
            }
        }


      

        /* -- Favorite Gifs related functions -- */

        function addGif(gif){
            $scope.newUser.gifs.push(gif);
            $scope.showFavGifsFlag = true;
        }

      
        /* -- Generic Error mesages function */

         function commFailure(){
            console.error("Ha habido un error de comunicación en HomeController");
        }


        /*-- Auxiliary functions --*/


        function randId() {   
            return Math.random().toString(36).substr(2, 10);  
        }






    }
})();