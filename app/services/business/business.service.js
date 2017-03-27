angular.module('business')
  .service('BusinessService', BusinessService);
BusinessService.$inject = [];
function BusinessService() {
  var service = this;
  service.business = {};

  service.setBusiness = function(business) {
    service.business = business;
  };

  service.getBusiness = function() {
    return service.business;
  };
}
