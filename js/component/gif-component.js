(function() {
    'use strict';
    angular
        .module('GeekAgenda')
        .component('gif', {
            templateUrl :'js/component/gif.html',

            bindings: {
            	arrayGifs : '='
            },
            controller: Gif
            controllerAs : 'gifComponent'
        });
    Gif.$inject = ['Giphy'];
    /* @ngInject */
    function Gif(Giphy) {
    	var vm = this;



    	/* vm variables */
    	vm.gifs = [];
    	vm.gifOffset = 0;

    	// Flags
	 	vm.showFavGifsFlag = false;
	    vm.searchByTrendyFlag = false;
	    vm.searchByRecentFlag = true;
	    vm.hiddenBlockFlag =true;   
	    vm.nextGifFlag = false;
    	///////////////////////////

    	/* vm functions */
	    vm.searchGif = searchGif;
	    vm.addGif = addGif;
	    vm.nextGifs = nextGifs;
	    vm.previousGifs = previousGifs;
	    vm.toggleSearchByTrendyFlag = toggleSearchByTrendyFlag;
	    vm.toggleSearchByRecentFlag = toggleSearchByRecentFlag;


        /* -- Giphy Related functions -- */

        function searchGif(query){
            vm.searchResults = true;

            if(vm.searchByRecentFlag && !vm.searchByTrendyFlag){

                Giphy.find(query).then(setGifs).catch(commFailure);
            } else {                
                Giphy.find(query).then(setGifs).catch(commFailure);
            }


        }

        function nextGifs(query){
            vm.gifOffset = vm.gifOffset + 8;           
            Giphy.findByOffset(query,vm.gifOffset).then(setGifs).catch(commFailure);
            vm.hiddenBlockFlag = false;
        }

        function previousGifs(query){
            vm.gifOffset = vm.gifOffset - 8;
            Giphy.findByOffset(query,vm.gifOffset).then(setGifs).catch(commFailure);
            
        }


        function setGifs(gifs){
            let gifsReceived = gifs.data.splice(0);
            if(vm.gifOffset < gifs.pagination.total_count){
                console.log(vm.gifOffset + "  " + gifs.pagination.total_count);
                if ( vm.searchByRecentFlag){
                    vm.gifs = Giphy.parseGifsList(gifsReceived,true);
                    console.log(vm.gifs);
                } else{
                    vm.gifs = Giphy.parseGifsList(gifsReceived, false);
                }
             vm.nextGifFlag = true;

            } else {
                console.log("llego al limite");
                vm.nextGifFlag = false;
            }
        }


      

        /* -- Favorite Gifs related functions -- */

        function addGif(gif){
            vm.newUser.gifs.push(gif);
            vm.showFavGifsFlag = true;
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


         function commFailure(){
            console.error("Ha habido un error de comunicación en HomeController");
        }

    }
})();