angular.module('app')
  .controller('UploadPhotoController', UploadPhotoController);

UploadPhotoController.$inject = ['data', 'collection',
  '$scope',
  '$mdDialog',
  '$sce'];

function UploadPhotoController(data, collection, $scope, $mdDialog, $sce) {
  $scope.$onInit = $onInit();
  $scope.data = data;
  $scope.collection = collection;
  $scope.cancel = cancel;
  $scope.submit = submit;
  $scope.trustSrc = trustSrc;
  $scope.photoUrl = {src: 'images/business.png', title: 'Uploaded Photo'};

  function $onInit() {
  }

  function trustSrc(src) {
    return $sce.trustAsResourceUrl(src);
  }

  function cancel() {
    $mdDialog.hide();
  }

  function submit() {
    data.photoUrl = $scope.photoUrl;
    console.log(data, collection, photoUrl);
  }
}
