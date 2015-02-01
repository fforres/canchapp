'use strict';

//Setting up route
angular.module('schedules').config(['$stateProvider',
	function($stateProvider) {
		// Schedules state routing
		$stateProvider.
		state('listSchedules', {
			url: '/companies/:companyId/schedules',
			templateUrl: 'modules/schedules/views/list-schedules.client.view.html'
		}).
		state('createSchedule', {
			url: '/companies/:companyId/schedules/create',
			templateUrl: 'modules/schedules/views/create-schedule.client.view.html'
		}).
		state('viewSchedule', {
			url: '/companies/:companyId/schedules/:scheduleId',
			templateUrl: 'modules/schedules/views/view-schedule.client.view.html'
		}).
		state('editSchedule', {
			url: '/companies/:companyId/schedules/:scheduleId/edit',
			templateUrl: 'modules/schedules/views/edit-schedule.client.view.html'
		});
	}
]);