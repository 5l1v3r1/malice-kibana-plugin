var _ = require('lodash');

import 'ui/autoload/styles';

require('jquery');
require('bootstrap');

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './less/main.less';

document.title = 'Malice - Kibana';

import chrome from 'ui/chrome';

// Set Kibana dark thmeme
chrome.addApplicationClass('theme-dark');

var app = require('ui/modules').get('apps/malice', []);

require('ui/routes').enable();
require('ui/routes')
  .when('/', {
    template: require('./templates/index.html'),
    controller: 'maliceStatusController',
    controllerAs: 'ctrl'
  })
  .when('/index/:name', {
    template: require('./templates/detail.html'),
    controller: 'maliceDetailController',
    controllerAs: 'ctrl'
  })
  .when('/health', {
    template: require('./templates/health.html'),
    controller: 'maliceHealthController',
    controllerAs: 'ctrl'
  })
  .when('/data', {
    template: require('./templates/data.html'),
    controller: 'maliceDataController',
    controllerAs: 'ctrl'
  });

app.controller('maliceStatusController', function ($scope, $http, kbnUrl) {

  $scope.topNavMenu = [{
    key: 'scan',
    description: 'Scan',
    run: function () {
      kbnUrl.change('/');
    },
    testId: 'maliceScanButton',
  }, {
    key: 'options',
    description: 'Options',
    template: require('./templates/options.html'),
    testId: 'maliceOptionsButton',
  }, {
    key: 'docs',
    description: 'Documentation',
    template: require('./templates/docs.html'),
    testId: 'maliceDocsButton',
  }];

  $http.get('../api/malice/indices').then((response) => {
    this.indices = response.data;
  });
})
  .controller('maliceDetailController', function ($routeParams, $http) {
    this.index = $routeParams.name;

    $http.get(`../api/malice/index/${this.index}`).then((response) => {
      this.status = response.data;
    });
  })
  .controller('maliceHealthController', function ($http) {
    $http.get('../api/malice/health').then((response) => {
      this.health = response.data;
    });
  })
  .controller('maliceDataController', function ($http) {
    $http.get('../api/malice/data').then((response) => {
      this.data = response.data;
    });
  });

function setDarkTheme(enabled) {
  const theme = Boolean(enabled) ? 'theme-dark' : 'theme-light';
  chrome.removeApplicationClass(['theme-dark', 'theme-light']);
  chrome.addApplicationClass(theme);
}
