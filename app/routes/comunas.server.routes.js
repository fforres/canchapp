'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var comunas = require('../../app/controllers/comunas.server.controller');

	// Comunas Routes
	app.route('/comunas')
		.get(comunas.list)
		.post(users.requiresLogin, comunas.create);

	app.route('/comunas/:comunaId')
		.get(comunas.read)
		.put(users.requiresLogin, comunas.hasAuthorization, comunas.update)
		.delete(users.requiresLogin, comunas.hasAuthorization, comunas.delete);

	// Finish by binding the Comuna middleware
	app.param('comunaId', comunas.comunaByID);
};
