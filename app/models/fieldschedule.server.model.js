'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Fieldschedule Schema
 */
var FieldscheduleSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Fieldschedule name',
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

mongoose.model('Fieldschedule', FieldscheduleSchema);