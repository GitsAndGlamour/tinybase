angular
  .module('functions', [])
  .service('UtilityService', UtilityService);
UtilityService.$inject = ['$sce'];
function UtilityService($sce) {
  var service = this;

  service.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };
}
