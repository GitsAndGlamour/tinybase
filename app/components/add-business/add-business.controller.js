angular.module('app')
  .controller('AddBusinessController', AddBusinessController);

AddBusinessController.$inject = ['user',
  '$scope',
  '$mdDialog'];

function AddBusinessController(user, $scope, $mdDialog) {
  $scope.cancel = cancel;
  $scope.$onInit = $onInit();

  function $onInit() {
    console.log(user);
  }

  function cancel() {
    $mdDialog.hide();
  }
}
