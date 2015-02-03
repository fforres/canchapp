'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');
	
/**
 * List of users except self
 */
exports.list = function(req, res) { 
	User.find().sort('-created').populate('user', 'displayName').exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(users);
		}
	});
};


exports.findById = function(req, res) {
	User.findOne({
		_id: req.params.userId
	},
	'-password -salt').exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(users);
		}
	});
};


// Disable a speciffic user
exports.disableUser = function(req, res) {
	// Init Variables
	var userId = req.params.userId || req.body.userId;
	User.findOneAndUpdate(userId,{$set:{enabled:false}}).exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(users);
		}
	});
};


// Enable a speciffic user
exports.enableUser = function(req, res) {
	// Init Variables
	var userId = req.params.userId || req.body.userId;
	User.findOneAndUpdate(userId,{$set:{enabled:true}}).exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(users);
		}
	});
};



// Update speciffic user

exports.updateById = function(req, res) {
	// Init Variables

	// Merge existing user
	var user = req.body;
	user.updated = Date.now();
	user.displayName = user.firstName + ' ' + user.lastName;
	delete user._id;
	delete user.username;
	User.findOneAndUpdate(req.params.userId,user).exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(users);
		}
	});
};

// Change password for user

exports.resetPasswordForUser = function(req, res) {
	// Init Variables
	var passwordDetails = req.body.passwordDetails;
	if (req.body.userId) {
		if (passwordDetails.newPassword) {
			User.findById(req.params.userId, function(err, user) {
				if (!err && user) {
						if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
							user.password = passwordDetails.newPassword;

							user.save(function(err) {
								if (err) {
									return res.status(400).send({
										message: errorHandler.getErrorMessage(err)
									});
								} else {
									req.login(user, function(err) {
										if (err) {
											res.status(400).send(err);
										} else {
											res.send({
												message: 'Password changed successfully'
											});
										}
									});
								}
							});
						} else {
							res.status(400).send({
								message: 'Passwords do not match'
							});
						}
				
				} else {
					res.status(400).send({
						message: 'User is not found'
					});
				}
			});
		} else {
			res.status(400).send({
				message: 'Please provide a new password'
			});
		}
	} else {
		res.status(400).send({
			message: 'Error'
		});
	}
};




/**
 * Create a new user
 */
exports.createUser = function(req, res) {
	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	// Init Variables
	var user = new User(req.body);
	var message = null;

	// Add missing user fields
	user.provider = 'local';
	user.displayName = user.firstName + ' ' + user.lastName;

	// Then save the user 
	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;
			res.json(user);
		}
	});
};
