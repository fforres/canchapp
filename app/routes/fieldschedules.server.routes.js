'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var fieldschedules = require('../../app/controllers/fieldschedules.server.controller');

	// Fieldschedules Routes
	app.route('/fieldschedules')
		.get(fieldschedules.list)
		.post(users.requiresLogin, fieldschedules.create);

	app.route('/fieldschedules/:fieldscheduleId')
		.get(fieldschedules.read)
		.put(users.requiresLogin, fieldschedules.hasAuthorization, fieldschedules.update)
		.delete(users.requiresLogin, fieldschedules.hasAuthorization, fieldschedules.delete);

	// Finish by binding the Fieldschedule middleware
	app.param('fieldscheduleId', fieldschedules.fieldscheduleByID);
};
