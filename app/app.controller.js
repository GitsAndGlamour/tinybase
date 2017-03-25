angular.module('app')
   .controller('AppController', AppController);

AppController.$inject = ['$mdDialog'];

/**
 * AppController handles the ui-view
 *
 * @param {Injector} $mdDialog Injector Module
 * @constructor
 */
function AppController($mdDialog) {
  var ctrl = this;
  ctrl.$onInit = $onInit;
  ctrl.showLoginDialog = showLoginDialog;
  ctrl.logout = logout;
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
      .then(function(answer) {
        ctrl.status = 'You said the information was "' + answer + '".';
      }, function() {
        ctrl.status = 'You cancelled the dialog.';
      });
    console.log(ctrl.status, tab);
  }

  /*
   Handles logout of application and provokes loginService
   to remove user Session data
   */
  function logout() {
    console.log('Logout');
  }
}
