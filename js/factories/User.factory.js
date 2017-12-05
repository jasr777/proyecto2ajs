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
            getUser : getUser
        };
        return service;
        ////////////////



        function getAll() {
        	let before = JSON.parse(localStorage.getItem('users'));
        	if (before == null){
        		return [];
        	} else {
        		let users = JSON.parse(localStorage.getItem('users'));
        		return users;
        	}

        }

        function getUser(id){
        	let before = getAll();
        	var user = {};

        	for (var i = 0; i < before.length;i++){
        		if(before[i].id == id){
        			user = before[i];
        			break;
        		}
        	}
        	return user;
        }


        function add(user){
        	
        	var before = getAll();
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
        	var before = getAll();
        	for (var i = 0 ; i < before.length; i++){
        		if ( before[i].id == user.id){
        			before[i] = user;
        		}
        	}
        	localStorage.setItem('users',JSON.stringify(before));
        }
}
})();