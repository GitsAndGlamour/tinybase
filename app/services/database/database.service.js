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
      displayName: user.displayName,
      email: user.email,
      business: 'n/a'
    });
  };

  service.getUser = function(user) {
    return service.database.ref('/users/' + user.uid).once('value')
      .then(function(snapshot) {
        UserService.setData(snapshot.val());
        return UserService.getData();
      });
  };

  service.createBusiness = function(business, user) {
    console.log(business, user);
    var newBusinessKey = service.database.ref().child('businesses').push().key;
    user.data.business = newBusinessKey;
    service.update('businesses', newBusinessKey, business);
    service.update('users', user.uid, user.data);
    return newBusinessKey;
  };

  service.update = function(collection, key, data) {
    var updates = {};
    updates['/' + collection + '/' + key] = data;
    return service.database.ref().update(updates);
  };
}
