var app = require('ui/modules').get('apps/malice', []);

import 'ui/autoload/styles';

require('jquery');
require('bootstrap');

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './less/main.less';

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

app.controller('maliceStatusController', function ($http) {
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
