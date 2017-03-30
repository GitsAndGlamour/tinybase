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
  $scope.passwordReset = passwordReset;

  function $onInit() {
  }

  function signUp() {
    console.log('Sign Up via Email...');
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
    console.log('Get user data...');
    FirebaseService.getCurrentUser();
    $mdDialog.hide();
  }

  function passwordReset() {
    var confirm = $mdDialog.prompt()
      .title('What is your e-mail address?')
      .textContent('Please provide the e-mail address you signed up ' +
        'with so we can send you an e-mail allowing you to reset your ' +
        'password.')
      .placeholder('janedoe@tinybase.com')
      .ariaLabel('E-Mail')
      .initialValue('someone@gmail.com')
      .ok('RESET PASSWORD')
      .cancel('CANCEL');

    $mdDialog.show(confirm).then(function(result) {
      FirebaseService.resetPassword(result);
    }, function() {
    });
  }
}
