'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Equipmentrental Schema
 */
var EquipmentrentalSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Equipmentrental name',
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

mongoose.model('Equipmentrental', EquipmentrentalSchema);