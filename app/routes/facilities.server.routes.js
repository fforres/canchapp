'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var facilities = require('../../app/controllers/facilities.server.controller');

	// Facilities Routes
	app.route('/facilities')
		.get(facilities.list)
		.post(users.requiresLogin, facilities.create);

	app.route('/facilities/:facilityId')
		.get(facilities.read)
		.put(users.requiresLogin, facilities.hasAuthorization, facilities.update)
		.delete(users.requiresLogin, facilities.hasAuthorization, facilities.delete);

	// Finish by binding the Facility middleware
	app.param('facilityId', facilities.facilityByID);
};
