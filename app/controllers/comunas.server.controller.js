'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Comuna = mongoose.model('Comuna'),
	_ = require('lodash');

/**
 * Create a Comuna
 */
exports.create = function(req, res) {
	var comuna = new Comuna(req.body);
	comuna.user = req.user;

	comuna.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(comuna);
		}
	});
};

/**
 * Show the current Comuna
 */
exports.read = function(req, res) {
	res.jsonp(req.comuna);
};

/**
 * Update a Comuna
 */
exports.update = function(req, res) {
	var comuna = req.comuna ;

	comuna = _.extend(comuna , req.body);

	comuna.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(comuna);
		}
	});
};

/**
 * Delete an Comuna
 */
exports.delete = function(req, res) {
	var comuna = req.comuna ;

	comuna.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(comuna);
		}
	});
};

/**
 * List of Comunas
 */
exports.list = function(req, res) { 
	Comuna.find().sort('-created').populate('user', 'displayName').exec(function(err, comunas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(comunas);
		}
	});
};


/**
 * List of Comunas by cities
 */
exports.listByCity = function(req, res) { 
	Comuna.find({city:req.params.cityId}).sort('-created').populate('user', 'displayName').exec(function(err, comunas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(comunas);
		}
	});
};



/**
 * Comuna middleware
 */
exports.comunaByID = function(req, res, next, id) { 
	Comuna.findById(id).populate('user', 'displayName').exec(function(err, comuna) {
		if (err) return next(err);
		if (! comuna) return next(new Error('Failed to load Comuna ' + id));
		req.comuna = comuna ;
		next();
	});
};

/**
 * Comuna authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.comuna.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
