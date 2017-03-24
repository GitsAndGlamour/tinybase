angular.module('app')
    .controller('HomeController', HomeController);
HomeController.$inject = [];

/**
 * Home Controller for the home page
 * @constructor
 */
function HomeController() {
  var ctrl = this;
  ctrl.$onInit = $onInit;

  /**
   * Initialization
   */
  function $onInit() {
    console.log('Home Controller');
  }
}
