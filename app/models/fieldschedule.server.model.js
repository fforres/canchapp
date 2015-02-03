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
	field: {
        type: Schema.ObjectId,
        default: null,
        required: 'Please select a field',
        ref:'Field',
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
    value: {
        type: Number,
        default: 0,
        required: 'Please select a value',
        trim: true
    },
    open: {
        type:Boolean,
        default: true
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

mongoose.model('Fieldschedule', FieldscheduleSchema);