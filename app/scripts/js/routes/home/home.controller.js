angular.module('app')
    .controller('HomeController', HomeController);

HomeController.$inject = [];

function HomeController() {

    var ctrl = this;

    ctrl.$onInit = $onInit;

    function $onInit() {
      console.log("Home Controller");
    }
}
