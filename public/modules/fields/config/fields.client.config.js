'use strict';

// Configuring the Articles module
angular.module('fields').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Fields', 'fields', 'dropdown', '/fields(/create)?');
		Menus.addSubMenuItem('topbar', 'fields', 'List Fields', 'fields');
		Menus.addSubMenuItem('topbar', 'fields', 'New Field', 'fields/create');
	}
]);