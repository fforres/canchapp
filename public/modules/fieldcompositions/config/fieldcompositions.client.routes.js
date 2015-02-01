'use strict';

//Setting up route
angular.module('fieldcompositions').config(['$stateProvider',
	function($stateProvider) {
		// Fieldcompositions state routing
		$stateProvider.
		state('listFieldcompositions', {
			url: '/fieldcompositions',
			templateUrl: 'modules/fieldcompositions/views/list-fieldcompositions.client.view.html'
		}).
		state('createFieldcomposition', {
			url: '/fieldcompositions/create',
			templateUrl: 'modules/fieldcompositions/views/create-fieldcomposition.client.view.html'
		}).
		state('viewFieldcomposition', {
			url: '/fieldcompositions/:fieldcompositionId',
			templateUrl: 'modules/fieldcompositions/views/view-fieldcomposition.client.view.html'
		}).
		state('editFieldcomposition', {
			url: '/fieldcompositions/:fieldcompositionId/edit',
			templateUrl: 'modules/fieldcompositions/views/edit-fieldcomposition.client.view.html'
		});
	}
]);