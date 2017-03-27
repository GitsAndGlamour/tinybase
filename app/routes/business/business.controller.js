angular.module('app')
    .controller('BusinessController', BusinessController);
BusinessController.$inject = ['UserService', 'BusinessService'];

/**
 * Home Controller for the home page
 * @constructor
 */
function BusinessController(UserService, BusinessService) {
  var ctrl = this;
  ctrl.$onInit = $onInit;

  /**
   * Initialization
   */
  function $onInit() {
    ctrl.user = UserService.getUser();
    ctrl.business = BusinessService.getBusiness();
    if (ctrl.user === null || ctrl.business === null) {
      $state.go('home');
    }
  }
}
