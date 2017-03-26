angular.module('user')
  .service('UserService', UserService);
UserService.$inject = [];
function UserService() {
  var service = this;
  service.user = {};

  service.setUser = function(user) {
    service.user = user;
  };

  service.getUser = function() {
    return service.user;
  };
}
