'use strict';

// Configuring the Articles module
angular.module('companies').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('admin', 'Companies', 'companies', 'dropdown', '/companies(/create)?');
		Menus.addSubMenuItem('admin', 'companies', 'List Companies', 'companies');
		Menus.addSubMenuItem('admin', 'companies', 'New Company', 'companies/create');
	}
]);