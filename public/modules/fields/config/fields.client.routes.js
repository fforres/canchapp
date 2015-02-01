

'use strict';

//Setting up route
angular.module('fields').config(['$stateProvider',
	function($stateProvider) {
		// Fields state routing
		$stateProvider.
		state('listFields', {
			url: '/companies/:companyId/fields',
			templateUrl: 'modules/fields/views/list-fields.client.view.html'
		}).
		state('createField', {
			url: '/companies/:companyId/fields/create',
			templateUrl: 'modules/fields/views/create-field.client.view.html'
		}).
		state('viewField', {
			url: '/companies/:companyId/fields/:fieldId',
			templateUrl: 'modules/fields/views/view-field.client.view.html'
		}).
		state('editField', {
			url: '/companies/:companyId/fields/:fieldId/edit',
			templateUrl: 'modules/fields/views/edit-field.client.view.html'
		});
	}
]);