'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tipo field Schema
 */
var TipoFieldSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Tipo field name',
		trim: true
	}, 
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('TipoField', TipoFieldSchema);