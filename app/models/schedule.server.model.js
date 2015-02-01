'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Schedule Schema
 */
var ScheduleSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Schedule name',
		trim: true
	},
	company: {
        type: Schema.ObjectId,
        default: null,
        required: 'Please select a company',
        ref:'company',
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

mongoose.model('Schedule', ScheduleSchema);