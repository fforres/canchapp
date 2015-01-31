'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var fields = require('../../app/controllers/fields.server.controller');

	// Fields Routes
	app.route('/fields')
		.get(fields.list)
		.post(users.requiresLogin, fields.create);

	app.route('/fields/:fieldId')
		.get(fields.read)
		.put(users.requiresLogin, fields.hasAuthorization, fields.update)
		.delete(users.requiresLogin, fields.hasAuthorization, fields.delete);

	// Finish by binding the Field middleware
	app.param('fieldId', fields.fieldByID);
};
