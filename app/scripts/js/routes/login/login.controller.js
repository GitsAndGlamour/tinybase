angular.module('app')
    .controller('LoginController', LoginController);

LoginController.$inject = ['$state'];

function LoginController($state) {

    var ctrl = this;

    ctrl.$onInit = $onInit;
    ctrl.login = login;
    ctrl.handleLoginSuccess = handleLoginSuccess;
    ctrl.handleLoginFailure = handleLoginFailure;

    function $onInit() {
      console.log("Login Controller");
        ctrl.username = null;
        ctrl.password = null;
        ctrl.invalidCredentials = false;
        ctrl.passwordType = 'password';
        ctrl.updates = {
            date: "Thursday March 23rd, 2017",
            items: [
                { text: "Integrated AngularJS." },
                { text: "Setup Application framework with Google Web Service Kit." }
            ]
        };

        determineNavigation();
    }

    function login() {
    }

    function handleLoginSuccess(success) {
      //TODO: Handle user profile here
      var userProfile = success.data;
         if(userProfile) {
           ctrl.invalidCredentials = false;
           $state.current.data.authState = 'loggedIn';
           $state.go('home');
         }
         else
           handleLoginFailure();
    }

    function handleLoginFailure() {
        ctrl.invalidCredentials = true;
        $state.current.data.authState = 'loggedOut';

        $state.go('login');
    }

    function determineNavigation() {
      //TODO: Service call for login here
      var data = "SERVICE CALL FOR LOGIN";
      var success = data.status == 200;

      if(success)
        handleLoginSuccess(data);
      else
        handleLoginFailure();

    }
}
