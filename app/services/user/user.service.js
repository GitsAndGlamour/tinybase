angular.module('user')
  .service('UserService', UserService);
UserService.$inject = [];
function UserService() {
  var service = this;
  service.user = {};

  service.setUser = function(user) {
    service.user = user;
  };

  service.setData = function(data) {
    service.user.data = data;
  };

  service.getUser = function() {
    return service.user;
  };

  service.getData = function() {
    return service.user.data;
  };
}
