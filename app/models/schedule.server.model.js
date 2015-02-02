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
	company: {
        type: Schema.ObjectId,
        default: null,
        required: 'Please select a company',
        ref:'Company',
        trim: true
    },
    startHour: {
		type: Number,
        default: 0,
        required: 'Please add a starting Hour',
        trim: true
    },
	endHour: {
		type: Number,
        default: 0,
        required: 'Please add an ending Hour',
        trim: true
    },
    day: {
        type: Schema.ObjectId,
        ref: 'Days'
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