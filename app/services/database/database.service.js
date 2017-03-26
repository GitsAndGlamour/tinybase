angular.module('database')
  .service('DatabaseService', DatabaseService);
DatabaseService.$inject = ['UserService'];
function DatabaseService(UserService) {
  var service = this;
  service.$onInit = $onInit();

  function $onInit() {
    service.database = firebase.database();
  }

  service.setDatabase = function(database) {
    service.database = database;
  };

  service.getDatabase = function() {
    return service.database;
  };

  service.createUser = function(user) {
    service.database.ref('users/' + user.uid).set({
      email: user.email,
      business: 'n/a'
    });
  };

  service.getUser = function(user) {
    return firebase.database().ref('/users/' + user.uid).once('value')
      .then(function(snapshot) {
        UserService.setData(snapshot.val());
      });
  };
}
