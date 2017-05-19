'use strict';

/**
 * @ngdoc function
 * @name ongeraApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ongeraApp
 */
angular.module('ongeraApp')
  .controller('MainCtrl', function ($state,$rootScope) {

  	this.login = "views/login.html";
  	this.loading = "views/loading.html";

    $rootScope.isLoading = false;
  	 console.log(' the rootScope'+$rootScope.isLoading);

  	

     this.user ={ username :"",
                   password : ""
               };

  	this.userAutherticate = function(){
  		   $state.go('operation',{
  		   	 obj : this.user
  		   });
  
  };


  });




