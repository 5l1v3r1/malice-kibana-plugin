import moment from 'moment';
import uiModules from 'ui/modules';
import uiRoutes from 'ui/routes';

import template from './templates/index.html';

import uiChrome from 'ui/chrome';
import logoUrl from 'plugins/malice/logo.png';


uiRoutes.enable();
uiRoutes
    .when('/', {
      template,
      resolve: {
        currentTime($http) {
          return $http.get('../api/malice/example').then(function (resp) {
            return resp.data.time;
          });
        }
      }
    });

uiModules
    .get('app/malice', [])
    .controller('maliceHelloWorld', function ($scope, $route, $interval) {
      $scope.title = 'Malice';
      $scope.description = 'Malice Kibana plugin';

      var currentTime = moment($route.current.locals.currentTime);
      $scope.currentTime = currentTime.format('HH:mm:ss');
      var unsubscribe = $interval(function () {
        $scope.currentTime = currentTime.add(1, 'second').format('HH:mm:ss');
      }, 1000);
      $scope.$watch('$destroy', unsubscribe);
    });
