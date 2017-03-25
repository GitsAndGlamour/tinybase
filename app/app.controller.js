angular.module('app')
   .controller('AppController', AppController);

AppController.$inject = ['$mdDialog', 'UserService'];

/**
 * AppController handles the ui-view
 *
 * @param {Injector} $mdDialog Injector Module for dialog popups
 * @param {Module} UserService Module that retains user data
 * @constructor
 */
function AppController($mdDialog, UserService) {
  var ctrl = this;
  ctrl.$onInit = $onInit;
  ctrl.showLoginDialog = showLoginDialog;
  ctrl.logout = logout;
  ctrl.user = null;
  /**
   * Initialization function
   */
  function $onInit() {
    console.log('AppController');
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
      });
  }

  /*
   Handles logout of application and provokes loginService
   to remove user Session data
   */
  function logout() {
    console.log('Logout');
  }
}
