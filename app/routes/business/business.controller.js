angular.module('app')
    .controller('BusinessController', BusinessController);
BusinessController.$inject = ['UserService', 'BusinessService',
  'UtilityService', '$state'];

/**
 * Home Controller for the home page
 * @constructor
 */
function BusinessController(UserService, BusinessService, UtilityService,
                            $state) {
  var ctrl = this;
  ctrl.$onInit = $onInit;
  ctrl.trustSrc = trustSrc;

  /**
   * Initialization
   */
  function $onInit() {
    ctrl.user = UserService.getUser();
    ctrl.business = BusinessService.getBusiness();
    console.log(ctrl.user, ctrl.business);
    if (ctrl.user === null || ctrl.business === null) {
      $state.go('home');
    }
  }

  function trustSrc(src) {
    return UtilityService.trustSrc(src);
  }
}
