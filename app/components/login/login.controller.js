angular.module('app')
  .controller('LoginController', LoginController);

LoginController.$inject = ['tab',
  '$scope',
  '$mdDialog',
  'FirebaseService'];

function LoginController(tab, $scope, $mdDialog,
                         FirebaseService) {
  $scope.selectedIndex = tab === 'signup' ? 0 : 1;
  $scope.$onInit = $onInit();
  $scope.cancel = cancel;
  $scope.signUp = signUp;
  $scope.facebookSignUp = facebookSignUp;
  $scope.googleSignUp = googleSignUp;
  $scope.login = login;
  $scope.facebookLogin = facebookLogin;
  $scope.googleLogin = googleLogin;

  function $onInit() {
  }

  function signUp() {
    FirebaseService.signUpViaEmail($scope.user.email, $scope.user.password);
    var authType = 'e-mail';
    getUserData(authType);
  }

  function facebookSignUp() {
    console.log('facebookSignUp');
  }

  function googleSignUp() {
    console.log('googleSignUp');
  }

  function login() {
    FirebaseService.signInViaEmail($scope.user.email, $scope.user.password);
    var authType = 'e-mail';
    getUserData(authType);
  }

  function facebookLogin() {
    console.log('facebookLogin');
  }

  function googleLogin() {
    console.log('googleLogin');
  }

  function cancel() {
    $mdDialog.hide();
  }

  function getUserData(authType) {
    FirebaseService.getCurrentUser(authType);
    $mdDialog.hide();
  }
}
