'use strict';

//Facilities service used to communicate Facilities REST endpoints
angular.module('facilities').factory('Facilities', ['$resource',
	function($resource) {
		return $resource('facilities/:facilityId', { facilityId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);