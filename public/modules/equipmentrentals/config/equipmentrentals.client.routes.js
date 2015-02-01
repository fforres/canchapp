'use strict';

//Setting up route
angular.module('equipmentrentals').config(['$stateProvider',
	function($stateProvider) {
		// Equipmentrentals state routing
		$stateProvider.
		state('listEquipmentrentals', {
			url: '/equipmentrentals',
			templateUrl: 'modules/equipmentrentals/views/list-equipmentrentals.client.view.html'
		}).
		state('createEquipmentrental', {
			url: '/equipmentrentals/create',
			templateUrl: 'modules/equipmentrentals/views/create-equipmentrental.client.view.html'
		}).
		state('viewEquipmentrental', {
			url: '/equipmentrentals/:equipmentrentalId',
			templateUrl: 'modules/equipmentrentals/views/view-equipmentrental.client.view.html'
		}).
		state('editEquipmentrental', {
			url: '/equipmentrentals/:equipmentrentalId/edit',
			templateUrl: 'modules/equipmentrentals/views/edit-equipmentrental.client.view.html'
		});
	}
]);