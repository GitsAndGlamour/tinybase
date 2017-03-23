angular.module('app')
  .controller('AppController', AppController);

AppController.$inject = [];

function AppController() {
    var ctrl = this;
    ctrl.$onInit = $onInit;

    function $onInit() {
      console.log("AppController");
    }
  }
