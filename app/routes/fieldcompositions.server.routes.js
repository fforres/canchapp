'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var fieldcompositions = require('../../app/controllers/fieldcompositions.server.controller');

	// Fieldcompositions Routes
	app.route('/fieldcompositions')
		.get(fieldcompositions.list)
		.post(users.requiresLogin, fieldcompositions.create);

	app.route('/fieldcompositions/:fieldcompositionId')
		.get(fieldcompositions.read)
		.put(users.requiresLogin, fieldcompositions.hasAuthorization, fieldcompositions.update)
		.delete(users.requiresLogin, fieldcompositions.hasAuthorization, fieldcompositions.delete);

	// Finish by binding the Fieldcomposition middleware
	app.param('fieldcompositionId', fieldcompositions.fieldcompositionByID);
};
