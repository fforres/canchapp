'use strict';

//Setting up route
angular.module('fieldschedules').config(['$stateProvider',
	function($stateProvider) {
		// Fieldschedules state routing
		$stateProvider.
		state('listFieldschedules', {
			url: '/fieldschedules',
			templateUrl: 'modules/fieldschedules/views/list-fieldschedules.client.view.html'
		}).
		state('createFieldschedule', {
			url: '/fieldschedules/create',
			templateUrl: 'modules/fieldschedules/views/create-fieldschedule.client.view.html'
		}).
		state('viewFieldschedule', {
			url: '/fieldschedules/:fieldscheduleId',
			templateUrl: 'modules/fieldschedules/views/view-fieldschedule.client.view.html'
		}).
		state('editFieldschedule', {
			url: '/fieldschedules/:fieldscheduleId/edit',
			templateUrl: 'modules/fieldschedules/views/edit-fieldschedule.client.view.html'
		});
	}
]);