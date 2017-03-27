angular.module('app')
  .controller('UploadPhotoController', UploadPhotoController);

UploadPhotoController.$inject = ['data', 'uid', 'collection',
  '$scope',
  '$mdDialog',
  '$sce',
  'BusinessService',
  'UserService',
  'DatabaseService', '$state'];

function UploadPhotoController(data, uid, collection, $scope,
                               $mdDialog, $sce, BusinessService,
                               UserService, DatabaseService, $state) {
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
    switch (collection) {
      case 'business': $state.go('business', {businessId: uid});
        break;
      case 'profile': $state.go('profile', {userId: uid});
        break;
      default: return;
    }
  }

  function submit() {
    data.photoUrl = $scope.photoUrl;
    var collectionName;
    switch (collection) {
      case 'business': collectionName = 'businesses';
        BusinessService.setBusiness(data);
        $state.go('business', {businessId: uid});
        break;
      case 'profile': collectionName = 'users';
        UserService.setUser(data);
        $state.go('profile', {userId: uid});
        break;
      default: return;
    }
    DatabaseService.update(collectionName, uid, data);
    $mdDialog.hide();
  }
}
