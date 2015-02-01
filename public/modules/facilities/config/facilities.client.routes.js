'use strict';

//Setting up route
angular.module('facilities').config(['$stateProvider',
	function($stateProvider) {
		// Facilities state routing
		$stateProvider.
		state('listFacilities', {
			url: '/facilities',
			templateUrl: 'modules/facilities/views/list-facilities.client.view.html'
		}).
		state('createFacility', {
			url: '/facilities/create',
			templateUrl: 'modules/facilities/views/create-facility.client.view.html'
		}).
		state('viewFacility', {
			url: '/facilities/:facilityId',
			templateUrl: 'modules/facilities/views/view-facility.client.view.html'
		}).
		state('editFacility', {
			url: '/facilities/:facilityId/edit',
			templateUrl: 'modules/facilities/views/edit-facility.client.view.html'
		});
	}
]);