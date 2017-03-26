angular.module('firebase')
  .service('FirebaseService', FirebaseService);
FirebaseService.$inject = ['$mdDialog', 'UserService', '$timeout'];
function FirebaseService($mdDialog, UserService, $timeout) {
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
    $timeout(function() {
      service.signInViaEmail(email, password);
    }, 5000);
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

  service.signInViaPopup = function(provider, auth) {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(token, user);
      UserService.setUser(user);
      console.log(user.email);
      $mdDialog.hide();
    }).catch(function(error) {
      $mdDialog.hide();
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .clickOutsideToClose(true)
          .title(auth + ' Sign-in Failure!')
          .textContent('There was an error logging into your ' + auth +
            ' account. Please try again. ' + error.message)
          .ariaLabel(auth + ' Sign-in Result Alert')
          .ok('OK')
      );
    });
  };

  service.logout = function() {
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

  service.verifyEmailAddress = function() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
      $mdDialog.hide();
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .clickOutsideToClose(true)
          .title('')
          .textContent('Your e-mail verification was successfully sent.')
          .ariaLabel('Email Verification Result Alert')
          .ok('OK')
      );
    }, function(error) {
      $mdDialog.hide();
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .clickOutsideToClose(true)
          .title('E-mail Verification Failure!')
          .textContent('There was an error verifying your e-mail account. ' +
            'Please try again. ' + error.message)
          .ariaLabel('Email Verification Result Alert')
          .ok('OK')
      );
    });
  };

  service.getCurrentUser = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        UserService.setUser(user);
        console.log(UserService.getUser());
      }
      return null;
    });
  };

  service.resetPassword = function(emailAddress) {
    var auth = firebase.auth();

    auth.sendPasswordResetEmail(emailAddress).then(function() {
      $mdDialog.hide();
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .clickOutsideToClose(true)
          .title('')
          .textContent('Your password reset e-mail was successfully sent.')
          .ariaLabel('Password Reset Alert')
          .ok('OK')
      );
    }, function(error) {
      $mdDialog.hide();
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .clickOutsideToClose(true)
          .title('Password Reset Failure!')
          .textContent('An error occurred in sending you a password ' +
            'reset e-mail to ' + emailAddress + '. Please try again. ' +
            error.message)
          .ariaLabel('Password Reset Error Alert')
          .ok('OK')
      );
    });
  };
}
