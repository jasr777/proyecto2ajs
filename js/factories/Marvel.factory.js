(function() {
    'use strict';
    angular
        .module('GeekAgenda')
        .factory('Marvel', Marvel);
    Marvel.$inject = ['$http'];
    /* @ngInject */
    function Marvel($http) {

    	var getComicsStartingWithUrl = "http://gateway.marvel.com/v1/public/comics?format=comic&noVariants=true&titleStartsWith="

    	var apiKey = "&apikey=bbe3d84a801cb357d8e072aa29b96ed9"
        var service = {
            getComicsStartingWithQuery : getComicsStartingWithQuery
        };
        return service;
        ////////////////
        function getComicsStartingWithQuery( query) {

        	return $http.get(getComicsStartingWithUrl+query+apiKey)
        		   .then(getComicResponse)
        		   .catch(commFailure);
        }



        function getComicResponse(response){
        	console.log("Data received in factory :");
        	console.log(response.data);
        	return response.data;
        }


        function commFailure(){
        	console.log("Ha habido un fallo de conexión");
        }




    }
})();