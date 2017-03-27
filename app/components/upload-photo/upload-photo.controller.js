angular.module('app')
  .controller('UploadPhotoController', UploadPhotoController);

UploadPhotoController.$inject = ['data', 'collection',
  '$scope',
  '$mdDialog'];

function UploadPhotoController(data, collection, $scope, $mdDialog) {
  $scope.$onInit = $onInit();
  $scope.data = data;
  $scope.collection = collection;
  $scope.cancel = cancel;
  $scope.submit = submit;
  $scope.photoUrl = 'images/business.png';

  function $onInit() {
  }

  function cancel() {
    $mdDialog.hide();
  }

  function submit() {
    data.photoUrl = $scope.photoUrl;
    console.log(data, collection, photoUrl);
  }
}
