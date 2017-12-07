(function() {
    'use strict';
    angular
        .module('GeekAgenda')
        .factory('Marvel', Marvel);
    Marvel.$inject = ['$http'];
    /* @ngInject */
    function Marvel($http) {

    	var getComicsStartingWithUrl = "http://gateway.marvel.com/v1/public/comics?format=comic&noVariants=true&ts=1&titleStartsWith="

    	var apiKey = "&apikey=bbe3d84a801cb357d8e072aa29b96ed9"
        var hash="&hash=9a6830017fdaacb7bebbe2833c4c8b71"
        var service = {
            getComicsStartingWithQuery : getComicsStartingWithQuery,
            formatComicsReceived : formatComicsReceived
        };
        return service;
        ////////////////
        function getComicsStartingWithQuery( query) {

        	return $http.get(getComicsStartingWithUrl+query+apiKey+hash)
        		   .then(getComicResponse)
        		   .catch(commFailure);
        }



        function getComicResponse(response){
        	console.log("Data received in factory :");
        	console.log(response.data);
        	return response.data;
        }


        function commFailure(){
        	console.log("Ha habido un fallo de conexión en MarvelFactory");
        }




        /* formatComicsReceived formatea los comics a un formato mejor que lo que llega en la api*/

        function formatComicsReceived(comics){
            let comicsFormated = [];

            for (var i = 0; i < comics.length ; i++){
                console.log(comics[i].title);
                let comicFormated = {};
                comicFormated.id = comics[i].id;
                comicFormated.characters = comics[i].characters;
                comicFormated.image = comics[i].images;
                comicFormated.thumbnail = comics[i].thumbnail.path +"."+ comics[i].thumbnail.extension;
                console.log(comicFormated.thumbnail);
                comicFormated.title = comics[i].title;
                comicsFormated.push(comicFormated);
            }
            return comicsFormated;

        }




    }
})();