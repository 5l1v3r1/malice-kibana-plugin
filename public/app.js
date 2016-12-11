import uiModules from 'ui/modules';
import uiRoutes from 'ui/routes';

import 'ui/autoload/styles';
import './less/main.less';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import overviewTemplate from './templates/index.html';
import detailTemplate from './templates/detail.html';
import healthTemplate from './templates/health.html';

require('jquery');
require('bootstrap');

uiRoutes.enable();
uiRoutes
.when('/', {
  template: overviewTemplate,
  controller: 'elasticsearchStatusController',
  controllerAs: 'ctrl'
})
.when('/index/:name', {
  template: detailTemplate,
  controller: 'elasticsearchDetailController',
  controllerAs: 'ctrl'
})
.when('/health', {
  template: healthTemplate,
  controller: 'elasticsearchHealthController',
  controllerAs: 'ctrl'
});

uiModules
.get('app/malice')
.controller('elasticsearchStatusController', function ($http) {
  $http.get('../api/malice/indices').then((response) => {
    this.indices = response.data;
  });
})
.controller('elasticsearchDetailController', function ($routeParams, $http) {
  this.index = $routeParams.name;

  $http.get(`../api/malice/index/${this.index}`).then((response) => {
    this.status = response.data;
  });
})
.controller('elasticsearchHealthController', function ($http) {
  $http.get('../api/malice/health').then((response) => {
    this.health = response.data;
  });
});
