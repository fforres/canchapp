'use strict';

// Configuring the Articles module
angular.module('schedules').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('admin', 'Schedules', 'schedules', 'dropdown', '/schedules(/create)?');
		Menus.addSubMenuItem('admin', 'schedules', 'List Schedules', 'schedules');
		Menus.addSubMenuItem('admin', 'schedules', 'New Schedule', 'schedules/create');
	}
]);