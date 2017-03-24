angular.module('app')
   .controller('AppController', AppController);

AppController.$inject = [];

/**
 * AppController handles the ui-view
 * @constructor
 */
function AppController() {
  var ctrl = this;
  ctrl.$onInit = $onInit;

  /**
   * Initialization function
   */
  function $onInit() {
    console.log('AppController');
  }
}
