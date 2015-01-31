'use strict';

//Tipo fields service used to communicate Tipo fields REST endpoints
angular.module('tipo-fields').factory('TipoFields', ['$resource',
	function($resource) {
		return $resource('tipo-fields/:tipoFieldId', { tipoFieldId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);