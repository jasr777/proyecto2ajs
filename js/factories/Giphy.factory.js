(function() {
    'use strict';
    angular
        .module('GeekAgenda')
        .factory('Giphy', Giphy);
    Giphy.$inject = ['$http'];
    /* @ngInject */
    function Giphy($http) {


    	// URL format =http://api.giphy.com/v1/gifs/search?q=INSERTQUERY
    	var giphyUrl = "http://api.giphy.com/v1/gifs/search?q=&limit=8"  
    	var apiKey = "&api_key=1jzBaAlq9VPdPxLSh1hOuuNKS6xbdBql";
    	var limit = "&limit=8";
        var service = {
            findByQuery: findByQuery
        };
        return service;
        ////////////////
        function findByQuery(query) {

        	return $http.get(giphyUrl+query+apikey+limit)
        			.then(correctResponse)
        			.catch(commFail);
        }

        
    }
})();