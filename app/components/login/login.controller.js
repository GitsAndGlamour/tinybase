angular.module('app')
  .controller('LoginController', LoginController);

LoginController.$inject = ['tab', '$scope', '$mdDialog'];

function LoginController(tab, $scope, $mdDialog) {
  $scope.$onInit = $onInit;
  $scope.cancel = cancel;
  $scope.selectedIndex = tab === 'signup' ? 0 : 1;

  function $onInit() {
  }

  function cancel() {
    $mdDialog.hide();
  }
}
