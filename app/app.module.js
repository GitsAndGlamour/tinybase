/**
 *  app.module.js
 *  */
angular
  .module('app', [
    'libraries',
    'services',
    'ui.router',
    'util',
    'widgets',
    'ngMaterial'
  ])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.definePalette('greyscale', {
      '50': 'e0e0e0',
      '100': 'b3b3b3',
      '200': '808080',
      '300': '4d4d4d',
      '400': '262626',
      '500': '000000',
      '600': '000000',
      '700': '000000',
      '800': '000000',
      '900': '000000',
      'A100': 'a6a6a6',
      'A200': '8c8c8c',
      'A400': '737373',
      'A700': '666666',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': [
        '50',
        '100',
        '200',
        'A100',
        'A200'
      ],
      'contrastLightColors': [
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
        'A400',
        'A700'
      ]
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('greyscale', {
        'default': '900',
        'hue-1': 'A100',
        'hue-2': 'A200',
        'hue-3': 'A400'
      });
  });
