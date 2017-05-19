'use strict';

/**
 * @ngdoc service
 * @name ongeraApp.userService
 * @description
 * # userService
 * Service in the ongeraApp.
 */

  ongeraApp.service('userService',['$http','$log', function ($http,$log) {

  var _currencyList  = [
             {
            symbol:"USD",
            name:"American Dollar"
              },
            {
            symbol:"£",
            name:"Great Britain Pound"
              },
             {
            symbol:"RWF",
            name:"Rwandan Francs"
              },
                {
            symbol:"FBU",
            name:"Burandian Francs"
              },
              {
            symbol:"KES",
            name:"Kenyan Shillings"
              },
                  {
            symbol:"UGS",
            name:"Uganda Shillings"
              }
  ];
 
	 var _operation = {
                 pricing_date: "1-12-2016",
                 domestic_currency: "RWF",
                 foreign_currency: "USD",
                 maturity: 90
  			};
   var _operationInit = {
                 pricing_date: " ",
                 domestic_currency: "",
                 foreign_currency: "",
                 maturity: ""
        };

    var _premiumResult = {
   				user_id:"" ,
  			    pricing_date: "",
  				maturity: " ",
  				underlying: " ",
  				min_prem: " ",
 			    max_prem: " "
            };
    
    this.getCurrencyList =  function(){
      return _currencyList;
    }
    this.getOperationDataInit = function(){
      return _operationInit;
    };

    this.getOperationData = function(){
    	return _operation;

    };

    this.getPremiumResult =function(){
    	return _premiumResult;
    };

    this.computePremium =  function(operationData,cb){
 
     $http.post('https://ongera-api.herokuapp.com/premium',operationData)
     .then(function(result){
         	$log.log(result.data);
         	cb(result.data);
         },function(result){
         	$log.error("error occurred during post");
         });
    };

     this.getAllCustomers =  function(cb){
 
     $http.get('https://customerrestapi.herokuapp.com/api/customers')
     .then(function(result){
          $log.log(result.data);
          cb(result.data);
         },function(result){
          $log.error("error occurred during get");
         });
    };

  }]);



 ongeraApp.factory('UserFactory', function UserFactory($http, API_URL, AuthTokenFactory, $q) {
    return {
      login: login,
      logout: logout,
      getUser: getUser
    };

    function login(userData) {
      return $http.post(API_URL + '/login', userData).then(function success(response) {
        AuthTokenFactory.setToken(response.data.token);
        return response;
      });
    }

    function logout() {
      AuthTokenFactory.setToken();
    };

    function getUser() {
      if (AuthTokenFactory.getToken()) {
        return $http.get(API_URL + '/me');
      } else {
        return $q.reject({ data: 'client has no auth token' });
      }
    }
  });

 ongeraApp.factory('AuthTokenFactory', function AuthTokenFactory($window) {
    'use strict';
    var store = $window.localStorage;
    var key = 'auth-token';

    return {
      getToken: getToken,
      setToken: setToken
    };

    function getToken() {
      return store.getItem(key);
    }

    function setToken(token) {
      if (token) {
        store.setItem(key, token);
      } else {
        store.removeItem(key);
      }
    }

  });

 ongeraApp.factory('AuthInterceptor', function AuthInterceptor(AuthTokenFactory) {
    'use strict';
    return {
      request: addToken
    };

    function addToken(config) {
      var token = AuthTokenFactory.getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
  });

