'use strict';

// Configuring the Articles module
angular.module('comunas').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('admin', 'Comunas', 'comunas', 'dropdown', '/comunas(/create)?');
		Menus.addSubMenuItem('admin', 'comunas', 'List Comunas', 'comunas');
		Menus.addSubMenuItem('admin', 'comunas', 'New Comuna', 'comunas/create');
	}
]);