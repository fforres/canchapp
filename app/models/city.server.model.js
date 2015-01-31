'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * City Schema
 */
var CitySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill City name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	pais: {
		type: Schema.ObjectId,
		default: null,
		required: 'Please select a pais',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('City', CitySchema);