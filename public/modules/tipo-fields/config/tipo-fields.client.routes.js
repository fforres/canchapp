'use strict';

//Setting up route
angular.module('tipo-fields').config(['$stateProvider',
	function($stateProvider) {
		// Tipo fields state routing
		$stateProvider.
		state('listTipoFields', {
			url: '/tipo-fields',
			templateUrl: 'modules/tipo-fields/views/list-tipo-fields.client.view.html'
		}).
		state('createTipoField', {
			url: '/tipo-fields/create',
			templateUrl: 'modules/tipo-fields/views/create-tipo-field.client.view.html'
		}).
		state('viewTipoField', {
			url: '/tipo-fields/:tipoFieldId',
			templateUrl: 'modules/tipo-fields/views/view-tipo-field.client.view.html'
		}).
		state('editTipoField', {
			url: '/tipo-fields/:tipoFieldId/edit',
			templateUrl: 'modules/tipo-fields/views/edit-tipo-field.client.view.html'
		});
	}
]);