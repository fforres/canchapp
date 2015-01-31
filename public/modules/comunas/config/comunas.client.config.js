'use strict';

// Configuring the Articles module
angular.module('comunas').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Comunas', 'comunas', 'dropdown', '/comunas(/create)?');
		Menus.addSubMenuItem('topbar', 'comunas', 'List Comunas', 'comunas');
		Menus.addSubMenuItem('topbar', 'comunas', 'New Comuna', 'comunas/create');
	}
]);