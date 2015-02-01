'use strict';

//Equipments service used to communicate Equipments REST endpoints
angular.module('equipments').factory('Equipments', ['$resource',
	function($resource) {
		return $resource('equipments/:equipmentId', { equipmentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);