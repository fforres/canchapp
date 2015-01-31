'use strict';

//Setting up route
angular.module('comunas').config(['$stateProvider',
	function($stateProvider) {
		// Comunas state routing
		$stateProvider.
		state('listComunas', {
			url: '/comunas',
			templateUrl: 'modules/comunas/views/list-comunas.client.view.html'
		}).
		state('createComuna', {
			url: '/comunas/create',
			templateUrl: 'modules/comunas/views/create-comuna.client.view.html'
		}).
		state('viewComuna', {
			url: '/comunas/:comunaId',
			templateUrl: 'modules/comunas/views/view-comuna.client.view.html'
		}).
		state('editComuna', {
			url: '/comunas/:comunaId/edit',
			templateUrl: 'modules/comunas/views/edit-comuna.client.view.html'
		});
	}
]);