(function() {
    'use strict';
    angular
        .module('GeekAgenda')
        .factory('User', User);
    User.$inject = [];
    /* @ngInject */
    function User() {
        var service = {
            getAll: getAll,
            add : add,
            remove : remove,
            update : update,
        };
        return service;
        ////////////////



        function getAll() {
        	let before = JSON.parse(localStorage.getItem('users'));
        	if (before == null){
        		console.log("No existe en LS");
        		return [];
        	} else {
        		console.log("Existe en LS");
        		let users = JSON.parse(localStorage.getItem('users'));
        		return users;
        	}

        }


        function add(user){
        	
        	var before = getAll();
        	console.log(before);
        	before.push(user);
        	localStorage.setItem('users',JSON.stringify(before));

        }


        function remove(id){
        	var before = getAll();
        	for (var i = 0; i < before.length ; i++){
        		if (before[i].id == id){
        			before.splice(i,1);
        		}
        	}
        	localStorage.setItem('users',JSON.stringify(before));
        }

        function update(user){
        	console.log("updating user with this data ");
        	console.log(user);
        	var before = getAll();
        	console.log("before update");
        	console.log(before);
        	for (var i = 0 ; i < before.length; i++){
        		if ( before[i].id == user.id){
        			console.log("esto aqui");
        			before[i] = user;
        		}
        	}
        	console.log("User update completed");
        	console.log(before);
        	localStorage.setItem('users',JSON.stringify(before));
        }


    }

})();