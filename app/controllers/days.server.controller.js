'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Day = mongoose.model('Day'),
	_ = require('lodash');

/**
 * Create a Day
 */
exports.create = function(req, res) {
	var day = new Day(req.body);
	day.user = req.user;

	day.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(day);
		}
	});
};

/**
 * Show the current Day
 */
exports.read = function(req, res) {
	res.jsonp(req.day);
};

/**
 * Update a Day
 */
exports.update = function(req, res) {
	var day = req.day ;

	day = _.extend(day , req.body);

	day.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(day);
		}
	});
};

/**
 * Delete an Day
 */
exports.delete = function(req, res) {
	var day = req.day ;

	day.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(day);
		}
	});
};

/**
 * List of Days
 */
exports.list = function(req, res) { 
	Day.find().sort('-created').populate('user', 'displayName').exec(function(err, days) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(days);
		}
	});
};

/**
 * Day middleware
 */
exports.dayByID = function(req, res, next, id) { 
	Day.findById(id).populate('user', 'displayName').exec(function(err, day) {
		if (err) return next(err);
		if (! day) return next(new Error('Failed to load Day ' + id));
		req.day = day ;
		next();
	});
};

/**
 * Day authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.day.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
