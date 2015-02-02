'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var days = require('../../app/controllers/days.server.controller');

	// Days Routes
	app.route('/days')
		.get(days.list)
		.post(users.requiresLogin, days.create);

	app.route('/days/:dayId')
		.get(days.read)
		.put(users.requiresLogin, days.hasAuthorization, days.update)
		.delete(users.requiresLogin, days.hasAuthorization, days.delete);

	// Finish by binding the Day middleware
	app.param('dayId', days.dayByID);
};
