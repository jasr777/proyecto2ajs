(function() {
    'use strict';
    angular
        .module('GeekAgenda')
        .component('comic', {
        	templateUrl:'/js/component/comic.html',
            bindings: {
            	arrayComics : '=',
            	
            },
            controller: Comic,
            controllerAs : 'comicComponent'

        });
    Comic.$inject = ['Marvel'];
    /* @ngInject */
    function Comic(Marvel) {
    	var vm = this;


    		/* vm variables */
    		vm.comics = [];
			vm.comicsOffset = 0;
		   	vm.searchResults = false;


    	    vm.showFavComicsFlag = false;
    		vm.nextComicFlag = false;

  	    	vm.hiddenBlockFlag =true;   
  	    	////////////////////////////////
  	    	/* vm functions */
    		vm.addComic = addComic;
    		vm.searchComics = searchComics;
    		vm.nextComics = nextComics;
    		vm.previousComics = previousComics;

  

    	/*-- Comic related functions -- */

        function searchComics(query){
            vm.searchResults = true;
            // Cuando se busca reseteamos el offset.
            vm.comicsOffset = 0;
            Marvel.getComicsStartingWithQuery(query)
                  .then(setComics)
                  .catch(commFailure);
          
        }

         function nextComics(query){
            vm.comicsOffset= vm.comicsOffset + 3;
            Marvel.findByOffset(query,vm.comicsOffset).then(setComics).catch(commFailure);
            vm.hiddenBlockFlag = false;
        }

        function previousComics(query){
            vm.comicsOffset= vm.comicsOffset - 3;
            Marvel.findByOffset(query, vm.comicsOffset).then(setComics).catch(commFailure);
        }

        function setComics(comics){
            let comicsReceived = comics.data.results.splice(0);
            if(comicsReceived.length > 0){
                vm.hasComics = true;
                if(vm.comicsOffset <= comics.data.total){                
                    vm.comics = Marvel.formatComicsReceived(comicsReceived);
                    console.log(vm.comics);
                    vm.nextComicFlag = true;
                } else {
                    console.log("no hay mas comics");
                    vm.nextComicFlag = false;
                }
            } else {
                vm.hasComics = false;
            }
        }   

      

        function addComic(comic){
            vm.arrayComics.push(comic);
            vm.showFavComicsFlag = true;
        }

        /* -- Generic Error mesages function */

         function commFailure(){
            console.error("Ha habido un error de comunicación en HomeController");
        }




    }
})();