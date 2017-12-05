(function() {
    'use strict';
    angular
        .module('GeekAgenda')
        .factory('Giphy', Giphy);
    Giphy.$inject = ['$http'];
    /* @ngInject */
    function Giphy($http) {


    	// URL format =http://api.giphy.com/v1/gifs/search?q=INSERTQUERY
    	var giphyUrl = "http://api.giphy.com/v1/gifs/search?q="  
    	var giphyTrendyUrl = "http://api.giphy.com/v1/gifs/trending?"
    	var apiKey = "&api_key=1jzBaAlq9VPdPxLSh1hOuuNKS6xbdBql";
    	var limit = "&limit=8";
        var service = {
          //  findByQuery: findByQuery,
            findByTrendy : findByTrendy,
            findByRecent : findByRecent,
        };
        return service;
        ////////////////

        /*
        function findByQuery(query) {

        	return $http.get(giphyUrl+query+apiKey+limit)
        			.then(correctResponse)
        			.catch(commFailure);
        }*/



        function findByRecent(query){
        	return $http.get(giphyUrl+query+apiKey)
        	.then(setGifsByRecent)
        	.catch(commFailure);

        }


        function setGifsByRecent(response){
        	let gifsByDate = response.data;

        	// TODO : sory by recent

        }



        function findByTrendy(query){
        	return $http.get(giphyTrendyUrl+apiKey)
        	.then(correctResponse)
        	.catch(commFailure);
        }




        function correctResponse(response){
        	console.log("Correct response : ")
        	console.log(response.data);
        	return response.data;
        }


        function commFailure(){
        	console.log("Ha habido un error de comunicación");
        }

        
    }
})();