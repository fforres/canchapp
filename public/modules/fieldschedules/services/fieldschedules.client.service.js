'use strict';

//Fieldschedules service used to communicate Fieldschedules REST endpoints
angular.module('fieldschedules').factory('Fieldschedules', ['$resource',
	function($resource) {
		return $resource('fieldschedules/:fieldscheduleId', { fieldscheduleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);