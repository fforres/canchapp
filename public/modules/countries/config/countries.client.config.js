'use strict';

// Configuring the Articles module
angular.module('countries').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('admin', 'Countries', 'countries', 'dropdown', '/countries(/create)?');
		Menus.addSubMenuItem('admin', 'countries', 'List Countries', 'countries');
		Menus.addSubMenuItem('admin', 'countries', 'New Country', 'countries/create');
	}
]);