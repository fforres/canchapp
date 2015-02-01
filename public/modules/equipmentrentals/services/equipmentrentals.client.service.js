'use strict';

//Equipmentrentals service used to communicate Equipmentrentals REST endpoints
angular.module('equipmentrentals').factory('Equipmentrentals', ['$resource',
	function($resource) {
		return $resource('equipmentrentals/:equipmentrentalId', { equipmentrentalId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);