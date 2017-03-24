/**
 *  app.module.js
 *  */
angular
  .module('app', [
    'libraries',
    'services',
    'ui.router',
    'util',
    'widgets'
  ])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('lime');
  });
