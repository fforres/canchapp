'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comuna Schema
 */
var ComunaSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Comuna name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	city: {
		type: Schema.ObjectId,
		default: null,
		required: 'Please select a city',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Comuna', ComunaSchema);