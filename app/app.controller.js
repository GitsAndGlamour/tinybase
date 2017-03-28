angular.module('app')
   .controller('AppController', AppController);

AppController.$inject = ['$mdDialog', 'BusinessService',
  'UserService', 'FirebaseService', 'DatabaseService', '$timeout', '$state'];

function AppController($mdDialog, BusinessService, UserService,
                       FirebaseService, DatabaseService, $timeout, $state) {
  var ctrl = this;
  ctrl.$onInit = $onInit;
  ctrl.showLoginDialog = showLoginDialog;
  ctrl.logout = logout;
  ctrl.showEmailVerificationDialog = showEmailVerificationDialog;
  ctrl.showAddBusinessDialog = showAddBusinessDialog;
  ctrl.user = null;
  ctrl.business = null;
  ctrl.emailVerified = true;
  ctrl.userService = UserService;
  /**
   * Initialization function
   */
  function $onInit() {
    ctrl.runCircular = false;
    if (ctrl.user === null) {
      $state.go('home');
    }
  }

  /**
   *  Handles login into application and provokes loginService
   *
   * @param {String} tab - Either 'signin' or 'login'
   */
  function showLoginDialog(tab) {
    $mdDialog.show({
      controller: LoginController,
      templateUrl: 'components/login/login.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      locals: {
        tab: tab
      }
    })
    .then(function() {
      ctrl.runCircular = true;
      $timeout(function() {
        ctrl.user = UserService.getUser();
        if (ctrl.user.email) {
          ctrl.emailVerified = checkIfEmailIsVerified(ctrl.user.email);
        } if (ctrl.user) {
          populateUserAndBusinessData(ctrl.user);
        }
      }, 5000);
    });
  }

  function checkIfEmailIsVerified(email) {
    if (!email) {
      return false;
    }
    return true;
  }

  function populateUserAndBusinessData(user) {
    DatabaseService.getUser(user).then(function(data) {
      if (data === null) {
        DatabaseService.createUser(user);
        $timeout(function() {
          DatabaseService.getUser(user).then(function(response) {
            UserService.setData(response);
            var userProfile = UserService.getUser();
            console.log(userProfile);
            ctrl.business = userProfile.data.business;
            if (ctrl.business === 'n/a') {
              ctrl.runCircular = false;
              showAddBusinessDialog(userProfile);
            } else {
              ctrl.runCircular = false;
              routeToBusinessState(userProfile);
            }
          });
        }, 5000);
      } else {
        ctrl.business = user.data.business;
        ctrl.runCircular = false;
        routeToBusinessState(user);
      }
    });
  }

  function routeToBusinessState(user) {
    var businessUid = user.data.business;
    DatabaseService.getBusiness(businessUid);
    $state.go('business', {businessId: businessUid});
  }

  function showAddBusinessDialog(user) {
    $mdDialog.show({
      controller: AddBusinessController,
      templateUrl: 'components/add-business/add-business.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      locals: {
        user: user
      }
    });
  }

  /*
   Handles logout of application and provokes loginService
   to remove user Session data
   */
  function logout() {
    FirebaseService.logout();
    $state.go('home');
    UserService.setUser(null);
    ctrl.user = null;
  }

  function showEmailVerificationDialog() {
    var confirm = $mdDialog.confirm()
      .title('Would you like to verify your e-mail?')
      .textContent('To verify your e-mail, just click OK, ' +
        'otherwise click CANCEL.')
      .ariaLabel('E-mail Verification Notice')
      .ok('OK')
      .cancel('CANCEL');

    $mdDialog.show(confirm).then(function() {
      FirebaseService.verifyEmailAddress();
    }, function() {
      ctrl.emailVerified = false;
    });
  }
}
