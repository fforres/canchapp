'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Fieldschedule = mongoose.model('Fieldschedule'),
	_ = require('lodash');

/**
 * Create a Fieldschedule
 */
exports.create = function(req, res) {
	var fieldschedule = new Fieldschedule(req.body);
	fieldschedule.user = req.user;

	fieldschedule.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fieldschedule);
		}
	});
};

/**
 * Show the current Fieldschedule
 */
exports.read = function(req, res) {
	res.jsonp(req.fieldschedule);
};

/**
 * Update a Fieldschedule
 */
exports.update = function(req, res) {
	var fieldschedule = req.fieldschedule ;

	fieldschedule = _.extend(fieldschedule , req.body);

	fieldschedule.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fieldschedule);
		}
	});
};

/**
 * Delete an Fieldschedule
 */
exports.delete = function(req, res) {
	var fieldschedule = req.fieldschedule ;

	fieldschedule.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fieldschedule);
		}
	});
};

/**
 * List of Fieldschedules
 */
exports.list = function(req, res) { 
	Fieldschedule.find().sort('-created').populate('user', 'displayName').exec(function(err, fieldschedules) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fieldschedules);
		}
	});
};

/**
 * Fieldschedule middleware
 */
exports.fieldscheduleByID = function(req, res, next, id) { 
	Fieldschedule.findById(id).populate('user', 'displayName').exec(function(err, fieldschedule) {
		if (err) return next(err);
		if (! fieldschedule) return next(new Error('Failed to load Fieldschedule ' + id));
		req.fieldschedule = fieldschedule ;
		next();
	});
};

/**
 * Fieldschedule authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fieldschedule.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
