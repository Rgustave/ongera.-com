'use strict';

/**
 * @ngdoc function
 * @name ongeraApp.controller:OperationCtrl
 * @description
 * # OperationCtrl
 * Controller of the ongeraApp
 */
angular.module('ongeraApp')
  .controller('OperationCtrl',['userService','UserFactory','spinnerService',function (userService,UserFactory,spinnerService) {
	
 
   
	var operation = this;
  operation.isComputing = false;

  operation.currencyOne={
    symbol:"RWF"
  }
    operation.currencyTwo={
    symbol:"USD"
  }

  operation.currencyList = userService.getCurrencyList();
	operation.oparationData = userService.getOperationData();
	operation.operationResultData =  userService.getPremiumResult();
  operation.operationDataInit = userService.getOperationDataInit();

  operation.isLongEnough = {
     isInterest_rate_InitLong:false,
     isTnterest_rate_Second:false,
     isForex_rate:false
  }
  operation.forexData  = {
    interest_rate_Init : "",
    interest_rate_Second:"",
    forex_rate :""
  };

    
    operation.showCurrencyListOne = false;
    operation.showCurrencyListFalse = false;


	  operation.buttonClik30 = function(){
    console.log("clicked");
		operation.oparationData.maturity = 30;
	};

	operation.buttonClik90 = function(){
		operation.oparationData.maturity = 90;
	};

	operation.buttonClik60 = function(){
		operation.oparationData.maturity = 60;
	};

	operation.buttonClik180 = function(){
		operation.oparationData.maturity = 180;
	};

	operation.buttonClik360 = function(){
		operation.oparationData.maturity = 360;
	};

	operation.logout =  function () {
      UserFactory.logout();
    };


    operation.ComputePremiums = function(){
      
      operation.oparationData.domestic_currency = operation.currencyOne.symbol;
      operation.oparationData.foreign_currency = operation.currencyTwo.symbol;
      operation.oparationData.pricing_date = operation.pricing_date;
      console.log( operation.oparationData)
      spinnerService.show('ComputeSpinner');
    	userService.computePremium(operation.oparationData,function(response){
    		operation.operationResultData = response;
        operation.isComputing = false;
      spinnerService.hide('ComputeSpinner');

    	});
    };
    operation.pickCurrency = function(currency){
       operation.currencyOne.symbol =currency;
       console.log(operation.currencyOne);
    };
      operation.pickCurrencyTwo = function(currency){
       operation.currencyTwo.symbol =currency;
       console.log(operation.currencyTwo);
    };
    operation.chooseCurrencyOne = function(){
    	if(operation.showCurrencyListOne === false){
	        operation.showCurrencyListTwo = false;
	    	operation.showCurrencyListOne = true;
        }else{
        	 operation.showCurrencyListOne = false;
        	 operation.showCurrencyListTwo = false;

        }
    };

    operation.chooseCurrencyTwo = function(){
       
        if(operation.showCurrencyListTwo === false){
           operation.showCurrencyListOne = false;
           operation.showCurrencyListTwo = true;
        }else{
        	 operation.showCurrencyListTwo = false;
        	 operation.showCurrencyListOne = false;
     }

    };


    function lauchModal (value) {
        if (!value){ return;
      }
        if (value.interest_rate_Init.length>5) {
           operation.isLongEnough.isTnterest_rate_Second=false;
           operation.isLongEnough.isForex_rate=false;  
           operation.isLongEnough.isInterest_rate_InitLong=true;
               
        }
        else if(value.interest_rate_Init.length<5){
           operation.isLongEnough.isInterest_rate_InitLong=false;
                
        }
        
        if (value.interest_rate_Second.length>5) {
           operation.isLongEnough.isForex_rate=false;  
           operation.isLongEnough.isInterest_rate_InitLong=false;
           operation.isLongEnough.isTnterest_rate_Second=true;


        } else if(value.interest_rate_Second.length<5){
           operation.isLongEnough.isTnterest_rate_Second=false;
        }

        if (value.forex_rate.length>5) {
           operation.isLongEnough.isInterest_rate_InitLong=false;
           operation.isLongEnough.isTnterest_rate_Second=false;
           operation.isLongEnough.isForex_rate=true;  
           
        }else if(value.forex_rate.length<5){
          operation.isLongEnough.isForex_rate=false;
        }
    }

    operation.onInputChange = function(){
          lauchModal(operation.forexData);
              console.log("On Change");
                console.log(operation.forexData);



    }
    console.log(operation.forexData);
    
  }]);
