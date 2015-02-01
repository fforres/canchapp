'use strict';

// Configuring the Articles module
angular.module('equipmentrentals').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('admin', 'Equipmentrentals', 'equipmentrentals', 'dropdown', '/equipmentrentals(/create)?');
		Menus.addSubMenuItem('admin', 'equipmentrentals', 'List Equipmentrentals', 'equipmentrentals');
		Menus.addSubMenuItem('admin', 'equipmentrentals', 'New Equipmentrental', 'equipmentrentals/create');
	}
]);