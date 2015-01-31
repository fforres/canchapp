'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var tipoFields = require('../../app/controllers/tipo-fields.server.controller');

	// Tipo fields Routes
	app.route('/tipo-fields')
		.get(tipoFields.list)
		.post(users.requiresLogin, tipoFields.create);

	app.route('/tipo-fields/:tipoFieldId')
		.get(tipoFields.read)
		.put(users.requiresLogin, tipoFields.hasAuthorization, tipoFields.update)
		.delete(users.requiresLogin, tipoFields.hasAuthorization, tipoFields.delete);

	// Finish by binding the Tipo field middleware
	app.param('tipoFieldId', tipoFields.tipoFieldByID);
};
