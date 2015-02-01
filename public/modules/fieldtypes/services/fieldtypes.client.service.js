'use strict';

//Fieldtypes service used to communicate Fieldtypes REST endpoints
angular.module('fieldtypes').factory('Fieldtypes', ['$resource',
	function($resource) {
		return $resource('fieldtypes/:fieldtypeId', { fieldtypeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);