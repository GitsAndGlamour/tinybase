angular.module('app')
   .controller('AppController', AppController);

AppController.$inject = ['$mdDialog', 'BusinessService',
  'UserService', 'FirebaseService', 'DatabaseService', '$timeout', '$state'];

/**
 * AppController handles the ui-view
 *
 * @param {Injector} $mdDialog Injector Module for dialog popups
 * @param {Module} UserService Module that retains user data
 * @param {Module} FirebaseService Module that makes service
 * calls to Google Firebase API
 * @param {Module} DatabaseService Module handles Firebase data storage
 * @param {Injector} $timeout Injector Module for delaying processes
 * @param {Injector} $state Injector Module for changing and setting states
 * with Angular UI Router
 * @param {Module} BusinessService that retains business data
 *
 * @constructor
 */
function AppController($mdDialog, UserService, BusinessService,
                       FirebaseService, DatabaseService, $timeout, $state) {
  var ctrl = this;
  ctrl.$onInit = $onInit;
  ctrl.showLoginDialog = showLoginDialog;
  ctrl.logout = logout;
  ctrl.showEmailVerificationDialog = showEmailVerificationDialog;
  ctrl.user = null;
  ctrl.emailVerified = true;
  ctrl.businesses = [];
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
        console.log(ctrl.user);
        if (ctrl.user.email) {
          if (!ctrl.user.emailVerified) {
            ctrl.emailVerified = false;
          }
          DatabaseService.getUser(ctrl.user).then(function(user) {
            console.log(user);
            if (!user) {
              DatabaseService.createUser(ctrl.user);
              $timeout(function() {
                ctrl.user.data = UserService.getData();
                console.log(ctrl.user);
              }, 5000);
              showAddBusinessDialog(ctrl.user);
            } else if (user.business === 'n/a') {
              showAddBusinessDialog(ctrl.user);
            } else {
              ctrl.business = BusinessService.getBusiness();
              console.log(ctrl.business);
              $state.go('business', {businessId: ctrl.business.uid});
            }
          });
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
        user: user
      }
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
