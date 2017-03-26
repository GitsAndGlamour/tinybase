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
  $scope.facebookProvider = new firebase.auth.FacebookAuthProvider();
  $scope.googleProvider = new firebase.auth.GoogleAuthProvider();
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
    googleLogin();
  }

  function login() {
    FirebaseService.signInViaEmail($scope.user.email, $scope.user.password);
    getUserData();
  }

  function facebookLogin() {
    FirebaseService.signInViaPopup($scope.facebookProvider);
  }

  function googleLogin() {
    FirebaseService.signInViaPopup($scope.googleProvider);
  }

  function cancel() {
    $mdDialog.hide();
  }

  function getUserData() {
    FirebaseService.getCurrentUser();
    $mdDialog.hide();
  }
}
