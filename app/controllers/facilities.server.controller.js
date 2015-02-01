'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Facility = mongoose.model('Facility'),
	_ = require('lodash');

/**
 * Create a Facility
 */
exports.create = function(req, res) {
	var facility = new Facility(req.body);
	facility.user = req.user;

	facility.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(facility);
		}
	});
};

/**
 * Show the current Facility
 */
exports.read = function(req, res) {
	res.jsonp(req.facility);
};

/**
 * Update a Facility
 */
exports.update = function(req, res) {
	var facility = req.facility ;

	facility = _.extend(facility , req.body);

	facility.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(facility);
		}
	});
};

/**
 * Delete an Facility
 */
exports.delete = function(req, res) {
	var facility = req.facility ;

	facility.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(facility);
		}
	});
};

/**
 * List of Facilities
 */
exports.list = function(req, res) { 
	Facility.find().sort('-created').populate('user', 'displayName').exec(function(err, facilities) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(facilities);
		}
	});
};

/**
 * Facility middleware
 */
exports.facilityByID = function(req, res, next, id) { 
	Facility.findById(id).populate('user', 'displayName').exec(function(err, facility) {
		if (err) return next(err);
		if (! facility) return next(new Error('Failed to load Facility ' + id));
		req.facility = facility ;
		next();
	});
};

/**
 * Facility authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.facility.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
