'use strict';

// Configuring the Articles module
angular.module('cities').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('admin', 'Cities', 'cities', 'dropdown', '/cities(/create)?');
		Menus.addSubMenuItem('admin', 'cities', 'List Cities', 'cities');
		Menus.addSubMenuItem('admin', 'cities', 'New City', 'cities/create');
	}
]);