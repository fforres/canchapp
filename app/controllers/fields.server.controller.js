'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Field = mongoose.model('Field'),
	_ = require('lodash');

/**
 * Create a Field
 */
exports.create = function(req, res) {
	var field = new Field(req.body);
	field.user = req.user;

	field.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(field);
		}
	});
};

/**
 * Show the current Field
 */
exports.read = function(req, res) {
	res.jsonp(req.field);
};

/**
 * Update a Field
 */
exports.update = function(req, res) {
	var field = req.field ;

	field = _.extend(field , req.body);

	field.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(field);
		}
	});
};

/**
 * Delete an Field
 */
exports.delete = function(req, res) {
	var field = req.field ;

	field.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(field);
		}
	});
};

/**
 * List of Fields
 */
exports.list = function(req, res) { 
	Field.find().sort('-created').populate('user', 'displayName').exec(function(err, fields) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fields);
		}
	});
};


/**
 * List of Fields By Company
 */
exports.listByCompany = function(req, res) { 
	Field.find({company:req.params.companyId}).sort('-created').populate('user', 'displayName').exec(function(err, fields) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fields);
		}
	});
};

/**
 * Field middleware
 */
exports.fieldByID = function(req, res, next, id) { 
	Field.findById(id).populate('user', 'displayName').exec(function(err, field) {
		if (err) return next(err);
		if (! field) return next(new Error('Failed to load Field ' + id));
		req.field = field ;
		next();
	});
};

/**
 * Field authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.field.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
