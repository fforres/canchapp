'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var equipmentrentals = require('../../app/controllers/equipmentrentals.server.controller');

	// Equipmentrentals Routes
	app.route('/equipmentrentals')
		.get(equipmentrentals.list)
		.post(users.requiresLogin, equipmentrentals.create);

	app.route('/equipmentrentals/:equipmentrentalId')
		.get(equipmentrentals.read)
		.put(users.requiresLogin, equipmentrentals.hasAuthorization, equipmentrentals.update)
		.delete(users.requiresLogin, equipmentrentals.hasAuthorization, equipmentrentals.delete);

	// Finish by binding the Equipmentrental middleware
	app.param('equipmentrentalId', equipmentrentals.equipmentrentalByID);
};
