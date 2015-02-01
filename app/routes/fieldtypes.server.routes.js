'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var fieldtypes = require('../../app/controllers/fieldtypes.server.controller');

	// Fieldtypes Routes
	app.route('/fieldtypes')
		.get(fieldtypes.list)
		.post(users.requiresLogin, fieldtypes.create);

	app.route('/fieldtypes/:fieldtypeId')
		.get(fieldtypes.read)
		.put(users.requiresLogin, fieldtypes.hasAuthorization, fieldtypes.update)
		.delete(users.requiresLogin, fieldtypes.hasAuthorization, fieldtypes.delete);

	// Finish by binding the Fieldtype middleware
	app.param('fieldtypeId', fieldtypes.fieldtypeByID);
};
