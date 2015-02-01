'use strict';

// Configuring the Articles module
angular.module('equipments').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('admin', 'Equipments', 'equipments', 'dropdown', '/equipments(/create)?');
		Menus.addSubMenuItem('admin', 'equipments', 'List Equipments', 'equipments');
		Menus.addSubMenuItem('admin', 'equipments', 'New Equipment', 'equipments/create');
	}
]);