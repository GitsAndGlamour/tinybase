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
  $scope.provider = new firebase.auth.FacebookAuthProvider();
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
    getUserData();
  }

  function facebookSignUp() {
    facebookLogin();
  }

  function googleSignUp() {
    console.log('googleSignUp');
  }

  function login() {
    FirebaseService.signInViaEmail($scope.user.email, $scope.user.password);
    getUserData();
  }

  function facebookLogin() {
    FirebaseService.signInViaFacebook($scope.provider);
  }

  function googleLogin() {
    console.log('googleLogin');
  }

  function cancel() {
    $mdDialog.hide();
  }

  function getUserData() {
    FirebaseService.getCurrentUser();
    $mdDialog.hide();
  }
}
