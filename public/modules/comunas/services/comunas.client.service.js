'use strict';

//Comunas service used to communicate Comunas REST endpoints
angular.module('comunas').factory('Comunas', ['$resource',
	function($resource) {
		return $resource('comunas/:comunaId', { comunaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);