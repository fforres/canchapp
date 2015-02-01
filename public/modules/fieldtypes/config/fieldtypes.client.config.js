'use strict';

// Configuring the Articles module
angular.module('fieldtypes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('admin', 'Fieldtypes', 'fieldtypes', 'dropdown', '/fieldtypes(/create)?');
		Menus.addSubMenuItem('admin', 'fieldtypes', 'List Fieldtypes', 'fieldtypes');
		Menus.addSubMenuItem('admin', 'fieldtypes', 'New Fieldtype', 'fieldtypes/create');
	}
]);