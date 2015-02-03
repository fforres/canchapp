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
        ref:'Company',
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
        ref: 'Day'
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