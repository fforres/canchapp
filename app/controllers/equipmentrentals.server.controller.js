'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Equipmentrental = mongoose.model('Equipmentrental'),
	_ = require('lodash');

/**
 * Create a Equipmentrental
 */
exports.create = function(req, res) {
	var equipmentrental = new Equipmentrental(req.body);
	equipmentrental.user = req.user;

	equipmentrental.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(equipmentrental);
		}
	});
};

/**
 * Show the current Equipmentrental
 */
exports.read = function(req, res) {
	res.jsonp(req.equipmentrental);
};

/**
 * Update a Equipmentrental
 */
exports.update = function(req, res) {
	var equipmentrental = req.equipmentrental ;

	equipmentrental = _.extend(equipmentrental , req.body);

	equipmentrental.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(equipmentrental);
		}
	});
};

/**
 * Delete an Equipmentrental
 */
exports.delete = function(req, res) {
	var equipmentrental = req.equipmentrental ;

	equipmentrental.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(equipmentrental);
		}
	});
};

/**
 * List of Equipmentrentals
 */
exports.list = function(req, res) { 
	Equipmentrental.find().sort('-created').populate('user', 'displayName').exec(function(err, equipmentrentals) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(equipmentrentals);
		}
	});
};

/**
 * Equipmentrental middleware
 */
exports.equipmentrentalByID = function(req, res, next, id) { 
	Equipmentrental.findById(id).populate('user', 'displayName').exec(function(err, equipmentrental) {
		if (err) return next(err);
		if (! equipmentrental) return next(new Error('Failed to load Equipmentrental ' + id));
		req.equipmentrental = equipmentrental ;
		next();
	});
};

/**
 * Equipmentrental authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.equipmentrental.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
