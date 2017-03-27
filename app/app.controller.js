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
        ctrl.user = UserService.getUser();
        if (ctrl.user.email) {
          if (!ctrl.user.emailVerified) {
            ctrl.emailVerified = false;
          }
          DatabaseService.getUser(ctrl.user).then(function(user) {
            console.log(user, ctrl.user);
            if (!user) {
              DatabaseService.createUser(ctrl.user);
              $timeout(function() {
                ctrl.user.data = UserService.getData();
              }, 5000);
              showAddBusinessDialog(ctrl.user);
            } else if (user.business === 'n/a') {
              showAddBusinessDialog(ctrl.user);
            } else {
              ctrl.business = BusinessService.getBusiness();
              console.log(ctrl.business);
              $state.go('business', {businessId: ctrl.business.uid});
            } if (!BusinessService.getBusiness()) {
              ctrl.business = null;
            }
          });
        }
      });
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
