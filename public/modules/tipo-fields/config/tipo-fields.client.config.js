'use strict';

// Configuring the Articles module
angular.module('tipo-fields').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Tipo fields', 'tipo-fields', 'dropdown', '/tipo-fields(/create)?');
		Menus.addSubMenuItem('topbar', 'tipo-fields', 'List Tipo fields', 'tipo-fields');
		Menus.addSubMenuItem('topbar', 'tipo-fields', 'New Tipo field', 'tipo-fields/create');
	}
]);