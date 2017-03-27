angular.module('app')
  .controller('AddBusinessController', AddBusinessController);

AddBusinessController.$inject = ['user',
  '$scope',
  '$mdDialog',
  'DatabaseService',
  'US_STATES',
  'BUSINESS_CATEGORIES'];

function AddBusinessController(user, $scope, $mdDialog, DatabaseService,
                               US_STATES, BUSINESS_CATEGORIES) {
  $scope.$onInit = $onInit();
  $scope.states = US_STATES;
  $scope.cancel = cancel;
  $scope.submit = submit;
  $scope.categories = BUSINESS_CATEGORIES;
  $scope.facebookUrl = 'http://www.facebook.com/';
  $scope.url = 'http://www.';

  function $onInit() {
    console.log(user);
  }

  function cancel() {
    $mdDialog.hide();
  }

  function submit() {
    console.log($scope.business);
    DatabaseService.createBusiness($scope.business, user);
    $mdDialog.hide();

  }
}
