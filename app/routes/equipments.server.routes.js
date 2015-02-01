'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var equipments = require('../../app/controllers/equipments.server.controller');

	// Equipments Routes
	app.route('/equipments')
		.get(equipments.list)
		.post(users.requiresLogin, equipments.create);

	app.route('/equipments/:equipmentId')
		.get(equipments.read)
		.put(users.requiresLogin, equipments.hasAuthorization, equipments.update)
		.delete(users.requiresLogin, equipments.hasAuthorization, equipments.delete);

	// Finish by binding the Equipment middleware
	app.param('equipmentId', equipments.equipmentByID);
};
