'use strict';

//Fieldcompositions service used to communicate Fieldcompositions REST endpoints
angular.module('fieldcompositions').factory('Fieldcompositions', ['$resource',
	function($resource) {
		return $resource('fieldcompositions/:fieldcompositionId', { fieldcompositionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);