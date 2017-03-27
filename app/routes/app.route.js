angular
  .module('app')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        template: '<home flex></home>'
      })
      .state('business', {
      url: '/bisiness/{businessUid}',
      template: '<business flex></business>'
    });
  });
