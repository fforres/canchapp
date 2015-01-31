'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Field Schema
 */
var FieldSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Field name',
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

mongoose.model('Field', FieldSchema);