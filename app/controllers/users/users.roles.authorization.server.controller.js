'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');



/**
 * Require login and user role routing middleware
 */

exports.requiresUser = function(req, res, next) {
	var role = ['user'];
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}
	
	if (!_.intersection(req.user.roles, role).length){
        return res.status(404).send({
			message: 'User does not have a '+ role[0] +' role'
		});
	}

	next();
};

/**
 * Require login and user role routing middleware
 */
exports.requiresAdmin = function(req, res, next) {
	var role = ['admin'];
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}
	
	if (!_.intersection(req.user.roles, role).length){
        return res.status(401).send({
			message: 'User does not have a '+ role[0] +' role',
			redirectTo: '/'
		});
	}
 
	next();
};