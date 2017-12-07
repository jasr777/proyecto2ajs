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
        var offsetStr = "&offset=";
        var service = {
          //  findByQuery: findByQuery,
            findByTrendy : findByTrendy,
            findByRecent : findByRecent,
            findByOffset : findByOffset,
            parseGifsList : parseGifsList
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
        	return $http.get(giphyUrl+query+apiKey+limit)
        	.then(setGifsByRecent)
        	.catch(commFailure);

        }



        function findByOffset(query,offset){

            return $http.get(giphyUrl+query+apiKey+limit+offsetStr+offset)
                   .then(setGifsByRecent).catch(commFailure);
        }


 

        function setGifsByRecent(response){
            console.log(response.data);
            return response.data;
        	// TODO : sort by recent

        }

        function parseGifsList(gifs){

            let gifsListWithDateParsed = [];


            for (var i = 0; i < gifs.length; i ++){
                let parsedGif = {};
                parsedGif.type = gifs[i].type;
                parsedGif.id = gifs[i].id;
                parsedGif.url = gifs[i].url;
                parsedGif.username = gifs[i].username;
                parsedGif.rating = gifs[i].rating;
                parsedGif.user = gifs[i].user;
                parsedGif.updateDateTime = gifs[i].update_datetime;
                parsedGif.create_datetime = gifs[i].create_datetime;
                parsedGif.import_datetetime = Date.parse(gifs[i].import_datetime);
                parsedGif.trending_datetime = Date.parse(gifs[i].trending_datetime);
                parsedGif.images = gifs[i].images;
                parsedGif.title = gifs[i].title;              
                gifsListWithDateParsed.push(parsedGif);
            }


            return sortGifsByRecent(gifsListWithDateParsed).reverse();
        }

        function sortGifsByRecent (gifs){
            console.log("sorting gifs by recents");
            return gifs.sort( (a , b) => {
                var parsedA = a.import_datetime;
                var parsedB = b.import_datetime;
                return parsedA - parsedB;
            })
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