'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Fieldcomposition = mongoose.model('Fieldcomposition'),
	_ = require('lodash');

/**
 * Create a Fieldcomposition
 */
exports.create = function(req, res) {
	var fieldcomposition = new Fieldcomposition(req.body);
	fieldcomposition.user = req.user;

	fieldcomposition.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fieldcomposition);
		}
	});
};

/**
 * Show the current Fieldcomposition
 */
exports.read = function(req, res) {
	res.jsonp(req.fieldcomposition);
};

/**
 * Update a Fieldcomposition
 */
exports.update = function(req, res) {
	var fieldcomposition = req.fieldcomposition ;

	fieldcomposition = _.extend(fieldcomposition , req.body);

	fieldcomposition.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fieldcomposition);
		}
	});
};

/**
 * Delete an Fieldcomposition
 */
exports.delete = function(req, res) {
	var fieldcomposition = req.fieldcomposition ;

	fieldcomposition.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fieldcomposition);
		}
	});
};

/**
 * List of Fieldcompositions
 */
exports.list = function(req, res) { 
	Fieldcomposition.find().sort('-created').populate('user', 'displayName').exec(function(err, fieldcompositions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fieldcompositions);
		}
	});
};

/**
 * Fieldcomposition middleware
 */
exports.fieldcompositionByID = function(req, res, next, id) { 
	Fieldcomposition.findById(id).populate('user', 'displayName').exec(function(err, fieldcomposition) {
		if (err) return next(err);
		if (! fieldcomposition) return next(new Error('Failed to load Fieldcomposition ' + id));
		req.fieldcomposition = fieldcomposition ;
		next();
	});
};

/**
 * Fieldcomposition authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fieldcomposition.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
