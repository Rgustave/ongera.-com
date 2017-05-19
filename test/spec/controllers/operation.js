'use strict';

describe('Controller: OperationCtrl', function () {

  // load the controller's module
  beforeEach(module('ongeraApp'));

  var OperationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OperationCtrl = $controller('OperationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OperationCtrl.awesomeThings.length).toBe(3);
  });
});
