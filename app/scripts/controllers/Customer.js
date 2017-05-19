'use strict';

/**
 * @ngdoc function
 * @name ongeraApp.controller:CustomerCtrl
 * @description
 * # CustomerCtrl
 * Controller of the ongeraApp
 */
angular.module('ongeraApp')
  .controller('CustomerCtrl',['userService','UserFactory','$http','$uibModal',function ($uibModal,userService,UserFactory,$http) {
	
	var self = this;
	 self.customer = {
                id  :"" ,
                email : " ",
                firstname :" ",
                lastname : " ",
                phonenumber :" ",
                address : ""
   };
  self.customers = [];
   userService.getAllCustomers(function(response){
    		self.customers = response;
    	});
  

   self.showEditModal = function(customerId){
        $http.get("https://customerrestapi.herokuapp.com/api/customers/"+customerId).then(function(data){
            self.customer = data.data;
            console.log(self.customer);
            self.editCustomerModal = true;
        })
    };

    self.closeEditModal = function(){
        self.editCustomerModal = false;
    }



    self.editCustomer = function(customer){
            $http.put("https://customerrestapi.herokuapp.com/api/customers", customer).success(function () {
                self.editCustomerModal = false;
                toastr.success('Customer Updated');
              
            }).error(function () {
                    toastr.error("Please enter the CORRECT First Name, Last Name and Email");
                })
     };

  
    self.deleteCustomer= function(id) {
        self.customer.id=id;
        self.deleteConfirmModal=true;
    };

    self.noDeleteModal=function() {
        self.deleteConfirmModal=false;
    };

    self.yesDeleteModal=function () {
        $http.delete("https://customerrestapi.herokuapp.com/api/customers"+ self.customer.id).success(function () {
    
        })
    };
  }]);
