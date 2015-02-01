'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Fieldtype = mongoose.model('Fieldtype'),
	_ = require('lodash');

/**
 * Create a Fieldtype
 */
exports.create = function(req, res) {
	var fieldtype = new Fieldtype(req.body);
	fieldtype.user = req.user;

	fieldtype.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fieldtype);
		}
	});
};

/**
 * Show the current Fieldtype
 */
exports.read = function(req, res) {
	res.jsonp(req.fieldtype);
};

/**
 * Update a Fieldtype
 */
exports.update = function(req, res) {
	var fieldtype = req.fieldtype ;

	fieldtype = _.extend(fieldtype , req.body);

	fieldtype.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fieldtype);
		}
	});
};

/**
 * Delete an Fieldtype
 */
exports.delete = function(req, res) {
	var fieldtype = req.fieldtype ;

	fieldtype.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fieldtype);
		}
	});
};

/**
 * List of Fieldtypes
 */
exports.list = function(req, res) { 
	Fieldtype.find().sort('-created').populate('user', 'displayName').exec(function(err, fieldtypes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fieldtypes);
		}
	});
};

/**
 * Fieldtype middleware
 */
exports.fieldtypeByID = function(req, res, next, id) { 
	Fieldtype.findById(id).populate('user', 'displayName').exec(function(err, fieldtype) {
		if (err) return next(err);
		if (! fieldtype) return next(new Error('Failed to load Fieldtype ' + id));
		req.fieldtype = fieldtype ;
		next();
	});
};

/**
 * Fieldtype authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fieldtype.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
