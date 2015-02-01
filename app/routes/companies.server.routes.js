'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var companies = require('../../app/controllers/companies.server.controller');
	var fields = require('../../app/controllers/fields.server.controller');
	var schedules = require('../../app/controllers/schedules.server.controller');

	// Companies Routes
	app.route('/companies')
		.get(companies.list)
		.post(users.requiresLogin, companies.create);

	app.route('/companies/:companyId')
		.get(companies.read)
		.put(users.requiresLogin, companies.hasAuthorization, companies.update)
		.delete(users.requiresLogin, companies.hasAuthorization, companies.delete);

	app.route('/companies/:companyId/fields')
		.get(fields.list)

	app.route('/companies/:companyId/schedules')
		.get(schedules.list)

	// Finish by binding the Company middleware
	app.param('companyId', companies.companyByID);
};
