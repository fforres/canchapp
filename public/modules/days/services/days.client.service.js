'use strict';

//Days service used to communicate Days REST endpoints
angular.module('days').factory('Days', ['$resource',
	function($resource) {
		return $resource('days/:dayId', { dayId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);