angular.module('app')
   .controller('AppController', AppController);

AppController.$inject = ['$mdDialog', 'UserService', 'FirebaseService'];

/**
 * AppController handles the ui-view
 *
 * @param {Injector} $mdDialog Injector Module for dialog popups
 * @param {Module} UserService Module that retains user data
 * @param {Module} FirebaseService Module that makes service
 * calls to Google Firebase API
 * @constructor
 */
function AppController($mdDialog, UserService, FirebaseService) {
  var ctrl = this;
  ctrl.$onInit = $onInit;
  ctrl.showLoginDialog = showLoginDialog;
  ctrl.logout = logout;
  ctrl.showEmailVerificationDialog = showEmailVerificationDialog;
  ctrl.user = null;
  ctrl.emailVerified = true;
  /**
   * Initialization function
   */
  function $onInit() {
  }

  /**
   *  Handles login into application and provokes loginService
   *
   * @param {String} tab - Either 'signin' or 'login'
   */
  function showLoginDialog(tab) {
    $mdDialog.show({
      controller: LoginController,
      templateUrl: 'components/login/login.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      locals: {
        tab: tab
      }
    })
      .then(function() {
        ctrl.user = UserService.getUser();
        if (ctrl.user.email && !ctrl.user.emailVerified) {
          showEmailVerificationDialog();
        }
        console.log(ctrl.user);
      });
  }

  /*
   Handles logout of application and provokes loginService
   to remove user Session data
   */
  function logout() {
    FirebaseService.logout();
    ctrl.user = null;
  }

  function showEmailVerificationDialog() {
    var confirm = $mdDialog.confirm()
      .title('Would you like to verify your e-mail?')
      .textContent('To verify your e-mail, just click OK, ' +
        'otherwise click CANCEL.')
      .ariaLabel('E-mail Verification Notice')
      .ok('OK')
      .cancel('CANCEL');

    $mdDialog.show(confirm).then(function() {
      FirebaseService.verifyEmailAddress();
    }, function() {
      ctrl.emailVerified = false;
    });
  }
}
