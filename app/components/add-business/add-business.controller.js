angular.module('app')
  .controller('AddBusinessController', AddBusinessController);

AddBusinessController.$inject = ['user',
  '$scope',
  '$mdDialog',
  'DatabaseService',
'US_STATES'];

function AddBusinessController(user, $scope, $mdDialog, DatabaseService, US_STATES) {
  $scope.$onInit = $onInit();
  $scope.states = US_STATES;
  $scope.cancel = cancel;
  $scope.submit = submit;

  function $onInit() {
    console.log(user);
  }

  function cancel() {
    $mdDialog.hide();
  }

  function submit() {
    console.log($scope.business);
    DatabaseService.createBusiness($scope.business);
  }
}
