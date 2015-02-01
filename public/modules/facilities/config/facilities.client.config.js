'use strict';

// Configuring the Articles module
angular.module('facilities').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('admin', 'Facilities', 'facilities', 'dropdown', '/facilities(/create)?');
		Menus.addSubMenuItem('admin', 'facilities', 'List Facilities', 'facilities');
		Menus.addSubMenuItem('admin', 'facilities', 'New Facility', 'facilities/create');
	}
]);