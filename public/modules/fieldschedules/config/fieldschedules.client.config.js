'use strict';

// Configuring the Articles module
angular.module('fieldschedules').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('admin', 'Fieldschedules', 'fieldschedules', 'dropdown', '/fieldschedules(/create)?');
		Menus.addSubMenuItem('admin', 'fieldschedules', 'List Fieldschedules', 'fieldschedules');
		Menus.addSubMenuItem('admin', 'fieldschedules', 'New Fieldschedule', 'fieldschedules/create');
	}
]);