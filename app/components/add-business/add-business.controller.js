angular.module('app')
  .controller('AddBusinessController', AddBusinessController);

AddBusinessController.$inject = ['user',
  '$scope',
  '$mdDialog',
  'DatabaseService',
  'BusinessService',
  'US_STATES',
  'BUSINESS_CATEGORIES'];

function AddBusinessController(user, $scope, $mdDialog, BusinessService,
                               DatabaseService, US_STATES,
                               BUSINESS_CATEGORIES) {
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
    var businessUid = DatabaseService.createBusiness($scope.business, user);
    $scope.business.uid = businessUid;
    BusinessService.setBusiness($scope.business);
    $mdDialog.hide();
    showUploadPhotoDialog($scope.business, businessUid, 'business');
  }

  function showUploadPhotoDialog(data, uid, collection) {
    $mdDialog.show({
      controller: UploadPhotoController,
      templateUrl: 'components/upload-photo/upload-photo.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      locals: {
        data: data,
        uid: uid,
        collection: collection
      }
    });
  }
}
