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
            find : find,
            findByOffset : findByOffset,
            parseGifsList : parseGifsList
        };
        return service;
        ////////////////

        function find(query){
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
        }

        function parseGifsList(gifs, flag){

            let gifsListWithDateParsed = [];
            console.log("list of gifs to parse");
            console.log(gifs);

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

            // flag == true => sort by recent
            // flag == false ==> sort by trendy
            if (flag){
                console.log("returning gifs sorted by recent");
                let recents = gifsListWithDateParsed.sort((a,b) => {
                    return a.import_datetime - b.import_datetime;
                    /*
                    if(a.import_datetime < b.import_datetime){
                        return -1;
                    }

                    if(a.import_datetime > b.import_datetime){
                        return 1;
                    }
                    return 0;*/
                });
                return recents;
            } else {
                console.log("returning gifs sorted by trendy");
                let trendy  = sortGifsByTrendy(gifsListWithDateParsed).reverse();
                console.log(trendy);
                return trendy;
            }

        }

        // Arreglar
        function sortGifsByRecent (gifs){
            console.log("sorting gifs by recents");
            return gifs.sort( (a , b) => {
                console.log("a y b sort");
                console.log(a.import_datetime);
                console.log(b.import_datetime);
                if(a.import_datetime < b.import_datetime){
                    return -1;
                }

                if(a.import_datetime > b.import_datetime){
                    return 1;
                }
                return 0;
            })
        }

        function sortGifsByTrendy (gifs){
             console.log("sorting gifs by trendy");
             console.log(gifs);
            return gifs.sort( (a , b) => {
                var parsedA = a.trending_datetime;
                var parsedB = b.trending_datetime;
                return parsedA - parsedB;

                if (a.trending_datetime < b.trending_datetime){
                    return -1;
                }

                if(a.trending_datetime > b.trending_datetime){
                    return 1;
                }

                return 0;
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