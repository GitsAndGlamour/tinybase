/* app.module.js */
angular
  .module('app', [
    'libraries',
    'services',
    'ui.router',
    'util',
    'widgets'
  ])
  .config(function($compileProvider, $httpProvider,
                    $mdThemingProvider, CONFIG) {
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('lime');
    $httpProvider.defaults.withCredentials = true;
    if (CONFIG.projectInfo.env === 'prod') {
      $compileProvider.debugInfoEnabled(false);
    }
  });
