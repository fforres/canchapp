'use strict';

// Configuring the Articles module
angular.module('fieldcompositions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('admin', 'Fieldcompositions', 'fieldcompositions', 'dropdown', '/fieldcompositions(/create)?');
		Menus.addSubMenuItem('admin', 'fieldcompositions', 'List Fieldcompositions', 'fieldcompositions');
		Menus.addSubMenuItem('admin', 'fieldcompositions', 'New Fieldcomposition', 'fieldcompositions/create');
	}
]);