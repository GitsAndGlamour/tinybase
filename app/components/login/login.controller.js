angular.module('app')
  .controller('LoginController', LoginController);

LoginController.$inject = ['tab', '$scope', '$mdDialog'];

function LoginController(tab, $scope, $mdDialog) {
  $scope.selectedIndex = tab === 'signup' ? 0 : 1;
  $scope.$onInit = $onInit;
  $scope.cancel = cancel;
  $scope.signUp= signUp;
  $scope.login = login;
  $scope.facebookSignUp = facebookSignUp;
  $scope.googleSignUp = googleSignUp;
  $scope.facebookLogin = facebookLogin;
  $scope.googleLogin = googleLogin;

  function $onInit() {
  }

  function signUp() {
    console.log('login');
  }

  function facebookSignUp() {
    console.log('login');
  }

  function googleSignUp() {
    console.log('login');
  }

  function login() {
    console.log('login');
  }

  function facebookLogin() {
    console.log('login');
  }

  function googleLogin() {
    console.log('login');
  }

  function cancel() {
    $mdDialog.hide();
  }
}
