angular
  .module('app')
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('login', {
        url: '/login',
        data: {
          authState: 'loaded'
        },
        template: '<login flex></login>'
      })
      .state('home', {
        url: '/home',
        template: '<home flex></home>'
      })
  });
