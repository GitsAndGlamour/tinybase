angular.module('app')
  .controller('AddBusinessController', AddBusinessController);

AddBusinessController.$inject = ['user',
  '$scope',
  '$mdDialog',
  'FirebaseService'];

function AddBusinessController(tab, $scope, $mdDialog,
                         FirebaseService) {
  $scope.cancel = cancel;

  function cancel() {
    $mdDialog.hide();
  }
}
