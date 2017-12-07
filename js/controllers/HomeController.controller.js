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
    $scope.searchByRecentFlag = false;

    $scope.nextGifFlag = false;
    $scope.nextComicFlag = false;

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

    $scope.searchComics = searchComics;
    $scope.addComic = addComic;
    $scope.nextComics = nextComics;
    $scope.previousComics = previousComics;

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
            console.log("search by trendy flag on")

            $scope.searchByTrendyFlag = true;
            $scope.searchByRecentFlag = false;
        }

        function toggleSearchByRecentFlag(){
            console.log("search by recent flag on")
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


            if($scope.searchByRecentFlag && !$scope.searchByTrendyFlag){
                console.log("find by recent");
                Giphy.findByRecent(query).then(setGifs).catch(commFailure);
                $scope.searchByRecentFlag = false;
            } else {                
                console.log("find by trendy");
                Giphy.findByTrendy(query).then(setGifs).catch(commFailure);
                $scope.searchByTrendyFlag = false;

            }

        }

        function nextGifs(query){
            $scope.gifOffset = $scope.gifOffset + 8;
            console.log("NextGifs offset : " + $scope.gifOffset);
            
            Giphy.findByOffset(query,$scope.gifOffset).then(setGifs).catch(commFailure);
        }

        function previousGifs(query){
            $scope.gifOffset = $scope.gifOffset - 8;
            console.log("Previous gifs ofset : " + $scope.gifOffset);
            Giphy.findByOffset(query,$scope.gifOffset).then(setGifs).catch(commFailure);
        }


        function setGifs(gifs){
            $scope.gifs = gifs.data;
            $scope.nextGifFlag = true;
            console.log("Gifs recibidos en controller");
            console.log($scope.gifs);
        }


      

        /* -- Favorite Gifs related functions -- */

        function addGif(gif){
            console.log(gif);
            $scope.newUser.gifs.push(gif);
            console.log($scope.newUser.gifs);
            $scope.showFavGifsFlag = true;
        }

        /*-- Comic related functions -- */

        function searchComics(query){
            Marvel.getComicsStartingWithQuery(query)
                  .then(setComics)
                  .catch(commFailure);

        }

         function nextComics(query){
            $scope.comicsOffset= $scope.comicsOffset + 3;
            console.log("Next Comics offset in HomeController" +$scope.comicsOffset);
            Marvel.findByOffset(query,$scope.comicsOffset).then(setComics).catch(commFailure);

        }

        function previousComics(query){
            $scope.comicsOffset= $scope.comicsOffset - 3;
            Marvel.findByOffset(query, $scope.comicsOffset).then(setComics).catch(commFailure);
        }

        function setComics(comics){
            let comicsReceived = comics.data.results.splice(0);
            console.log(comicsReceived);
        
            $scope.comics = Marvel.formatComicsReceived(comicsReceived);
            $scope.nextComicFlag = true;
            console.log($scope.comics);
        }

      

        function addComic(comic){
            console.log(comic);
            $scope.newUser.comics.push(comic);
            console.log($scope.newUser.comics);
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