angular.module('app')
   .controller('AppController', AppController);

AppController.$inject = ['$mdDialog'];

/**
 * AppController handles the ui-view
 *
 * @param $mdDialog
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
   * @param tab
   */
  function showLoginDialog(tab) {
      $mdDialog.show({
        controller: LoginController,
        templateUrl: 'components/login/login.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true
      })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      console.log($scope.status, tab);
    }

  /*
   Handles logout of application and provokes loginService
   to remove user Session data
   */
  function logout() {
    console.log('Logout');
  }
}
