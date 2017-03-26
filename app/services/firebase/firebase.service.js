angular.module('firebase')
  .service('FirebaseService', FirebaseService);
FirebaseService.$inject = ['$mdDialog', 'UserService'];
function FirebaseService($mdDialog, UserService) {
  var service = this;

  service.signUpViaEmail = function(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        console.log(error);
        $mdDialog.hide();
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('Sign-up Failure!')
            .textContent('There was an error creating your account. ' +
              error.message)
            .ariaLabel('Email Sign-up Result Alert')
            .ok('OK')
        );
      });
    service.signInViaEmail(email, password);
  };

  service.signInViaEmail = function(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        $mdDialog.hide();
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('Sign-in Failure!')
            .textContent('There was an error logging into your account. ' +
              'Please try again. ' + error.message)
            .ariaLabel('Email Sign-in Result Alert')
            .ok('OK')
        );
      });
  };

  service.signOutViaEmail = function() {
    firebase.auth().signOut().then(function() {
      UserService.setUser(null);
    }).catch(function(error) {
      $mdDialog.hide();
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .clickOutsideToClose(true)
          .title('Log-out Failure!')
          .textContent('There was an error logging you out of your account. ' +
            'Please try again. ' + error.message)
          .ariaLabel('Email Log-out Result Alert')
          .ok('OK')
      );
    });
  };

  service.logout = function() {
    var user = UserService.getUser();
    switch (user.authType) {
      case 'e-mail':
        service.signOutViaEmail();
        break;
      case 'google':
        service.signOutViaGoogle();
        break;
      case 'facebook':
        service.signOutViaFacebook();
        break;
      default:
        break;
    }
  };

  service.getCurrentUser = function(authType) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        user.authType = authType;
        UserService.setUser(user);
        console.log(UserService.getUser());
      }
      return null;
    });
  };
}
