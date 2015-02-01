'use strict';

//Setting up route
angular.module('equipments').config(['$stateProvider',
	function($stateProvider) {
		// Equipments state routing
		$stateProvider.
		state('listEquipments', {
			url: '/equipments',
			templateUrl: 'modules/equipments/views/list-equipments.client.view.html'
		}).
		state('createEquipment', {
			url: '/equipments/create',
			templateUrl: 'modules/equipments/views/create-equipment.client.view.html'
		}).
		state('viewEquipment', {
			url: '/equipments/:equipmentId',
			templateUrl: 'modules/equipments/views/view-equipment.client.view.html'
		}).
		state('editEquipment', {
			url: '/equipments/:equipmentId/edit',
			templateUrl: 'modules/equipments/views/edit-equipment.client.view.html'
		});
	}
]);