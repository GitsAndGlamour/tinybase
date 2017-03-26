angular.module('app')
   .controller('AppController', AppController);

AppController.$inject = ['$mdDialog',
  'UserService', 'FirebaseService', 'DatabaseService', '$timeout'];

/**
 * AppController handles the ui-view
 *
 * @param {Injector} $mdDialog Injector Module for dialog popups
 * @param {Module} UserService Module that retains user data
 * @param {Module} FirebaseService Module that makes service
 * calls to Google Firebase API
 * @param {Module} DatabaseService Module handles Firebase data storage
 * @param {Injector} $timeout Injector Module for delaying processes
 *
 * @constructor
 */
function AppController($mdDialog, UserService,
                       FirebaseService, DatabaseService, $timeout) {
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
        if (ctrl.user.email) {
          if (!ctrl.user.emailVerified) {
            showEmailVerificationDialog();
          }
          var user = DatabaseService.getUser(ctrl.user);
          if (!user) {
            DatabaseService.createUser(ctrl.user);
            $timeout(function() {
              ctrl.user.data = UserService.getData();
              console.log(ctrl.user);
            }, 5000);
          } else if (user.business === 'n/a')
            showAddBusinessDialog(user);
        }

      });
  }

  function showAddBusinessDialog(user) {
    $mdDialog.show({
      controller: AddBusinessController,
      templateUrl: 'components/add-business/add-business.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      locals: {
        tab: tab
      }
    })
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
