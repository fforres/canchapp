'use strict';

//Setting up route
angular.module('days').config(['$stateProvider',
	function($stateProvider) {
		// Days state routing
		$stateProvider.
		state('listDays', {
			url: '/days',
			templateUrl: 'modules/days/views/list-days.client.view.html'
		}).
		state('createDay', {
			url: '/days/create',
			templateUrl: 'modules/days/views/create-day.client.view.html'
		}).
		state('viewDay', {
			url: '/days/:dayId',
			templateUrl: 'modules/days/views/view-day.client.view.html'
		}).
		state('editDay', {
			url: '/days/:dayId/edit',
			templateUrl: 'modules/days/views/edit-day.client.view.html'
		});
	}
]);