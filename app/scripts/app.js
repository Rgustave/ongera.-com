'use strict';

/**
 * @ngdoc overview
 * @name ongeraApp
 * @description
 * # ongeraApp
 *
 * Main module of the application.
 */
var ongeraApp = angular
  .module('ongeraApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'toastr',
    'angularSpinners',
    'moment-picker'

  ]);
  ongeraApp.config (['$stateProvider','$urlRouterProvider','$httpProvider',function($stateProvider,$urlRouterProvider,$httpProvider){
  
    $httpProvider.interceptors.push('AuthInterceptor');
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('Login',{
        url:'/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl as main',
  
    
      }).state('operation',{
          url:'/Operation',
          templateUrl: 'views/operation.html',
          controller: 'OperationCtrl as operation', 
          params: {
          obj: null
          },
          resolve: {
          result: ['$http','$stateParams','$location','$q', '$state','AuthTokenFactory', function($http, $stateParams,$location,$q,$state,AuthTokenFactory) {
                 var deferred = $q.defer();
                 console.log($stateParams.obj);
                 $http.post('https://ongera-api.herokuapp.com/bk/login',$stateParams.obj)
                    .then(function(response) { 
                      console.log(' it has worked');
                      console.log(response.data.access_token);
                      AuthTokenFactory.setToken(response.data.access_token);
                      deferred.resolve();
                    },function(){
                     deferred.reject({redirectTo: '/'});
                     console.log(' it has not worked');
                 });
              return deferred.promise;
         }]
        }
      });

  }]);

// Main API url
 ongeraApp.constant('API_URL', 'https://ongera-api.herokuapp.com/bk/');


 ongeraApp.run(['$rootScope','$state', function($rootScope,$state){

  $rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams){
     if(toState.resolve){
      $rootScope.isLoading = true;
      console.log('it is isLoading');
     }

  });

  $rootScope.$on('$stateChangeSuccess',function(event,toState,toParams,fromState,fromParams){
     if(toState.resolve){

      setTimeout($rootScope.isLoading, 3000);
      $rootScope.isLoading = false;
      console.log('it is not isLoading');
     }

  });

  $rootScope.$on('$stateChangeError', function(evt, to, toParams, from, fromParams, error) {
  if (error.redirectTo) {
    $state.go('Login');
    setTimeout($rootScope.isLoading, 3000);
    $rootScope.isLoading = false;
    console.log(' redirecting now');
  } else {
    $state.go('Login');
  }
});
   

 }]);

 /**   Custom Directives  */

 ongeraApp.directive('loginLoadingDirective', function(){
  return{
       templateUrl:'views/loading.html'
  };
 });

 ongeraApp.directive("currencyList", function() {
  return {
   scope: false,
    templateUrl: "currency-list.html"
  };
})

  ongeraApp.directive("currencyListTwo", function() {
  return {
    templateUrl: "currency-list-two.html"
  };
})
   ongeraApp.directive("inpuTextPopup", function() {
  return {
    templateUrl: "inpu-text-popup.html"
  };
})
      ongeraApp.directive("inpuTextPopup1", function() {
  return {
    templateUrl: "inpu-text-popup1.html"
  };
})  
 ongeraApp.directive("inpuTextPopup2", function() {
  return {
    templateUrl: "inpu-text-popup2.html"
  };
})
