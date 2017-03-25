angular.module('app')
  .controller('LoginController', LoginController);

LoginController.$inject = ['tab', '$scope', '$mdDialog'];

function LoginController(tab, $scope, $mdDialog) {
  $scope.$onInit = $onInit;
  $scope.cancel = cancel;
  $scope.selectedIndex = tab === 'signup' ? 0 : 1;
  $scope.login = login;

  function $onInit() {
  }

  function cancel() {
    $mdDialog.hide();
  }

  function login() {
    console.log('login');
  }
}
