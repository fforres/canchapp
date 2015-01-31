'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Company Schema
 */
var CompanySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill the Company name',
		trim: true
	},
	address: {
		type: String,
		default: '',
		required: 'Please fill Company address',
		trim: true
	},
	email: {
		type: String,
		default: '',
		required: 'Please fill Company contact email',
		trim: true
	},
	phone: {
		type: String,
		default: '',
		required: 'Please fill Company phone number',
		trim: true
	},
	geoloc_x: {
		type: Number,
		default: 0,
		trim: true
	},
	geoloc_y: {
		type: Number,
		default: 0,
		trim: true
	},
	comuna: {
		type: Schema.ObjectId,
		default: null,
		required: 'Please add a comuna',
		trim: true
	},
	city: {
		type: Schema.ObjectId,
		default: null,
		required: 'Please add a city',
		trim: true
	},
	country: {
		type: Schema.ObjectId,
		default: null,
		required: 'Please add a country',
		trim: true
	},
	iscafeteria: {
		type: Boolean, 
		default: false,
		trim: true 
	}, 
	isnecesariosersocio: {
		type: Boolean, 
		default: false, 
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

mongoose.model('Company', CompanySchema);