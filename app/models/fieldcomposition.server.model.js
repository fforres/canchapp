'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Fieldcomposition Schema
 */
var FieldcompositionSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Fieldcomposition name',
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

mongoose.model('Fieldcomposition', FieldcompositionSchema);