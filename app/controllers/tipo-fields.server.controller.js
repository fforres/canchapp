'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	TipoField = mongoose.model('TipoField'),
	_ = require('lodash');

/**
 * Create a Tipo field
 */
exports.create = function(req, res) {
	var tipoField = new TipoField(req.body);
	tipoField.user = req.user;

	tipoField.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tipoField);
		}
	});
};

/**
 * Show the current Tipo field
 */
exports.read = function(req, res) {
	res.jsonp(req.tipoField);
};

/**
 * Update a Tipo field
 */
exports.update = function(req, res) {
	var tipoField = req.tipoField ;

	tipoField = _.extend(tipoField , req.body);

	tipoField.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tipoField);
		}
	});
};

/**
 * Delete an Tipo field
 */
exports.delete = function(req, res) {
	var tipoField = req.tipoField ;

	tipoField.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tipoField);
		}
	});
};

/**
 * List of Tipo fields
 */
exports.list = function(req, res) { 
	TipoField.find().sort('-created').populate('user', 'displayName').exec(function(err, tipoFields) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tipoFields);
		}
	});
};

/**
 * Tipo field middleware
 */
exports.tipoFieldByID = function(req, res, next, id) { 
	TipoField.findById(id).populate('user', 'displayName').exec(function(err, tipoField) {
		if (err) return next(err);
		if (! tipoField) return next(new Error('Failed to load Tipo field ' + id));
		req.tipoField = tipoField ;
		next();
	});
};

/**
 * Tipo field authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.tipoField.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
