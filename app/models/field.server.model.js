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
    fieldComposition: {
        type: Schema.ObjectId,
        default: null,
        required: 'Please select a field composition',
        ref:'fieldcomposition',
        trim: true
    },
    fieldType: {
        type: Schema.ObjectId,
        default: null,
        required: 'Please select a field type',
        ref:'fieldtype',
        trim: true
    },
    company: {
        type: Schema.ObjectId,
        default: null,
        required: 'Please select a company',
        ref:'Company',
        trim: true
    },
    reservationTime: {
        type: Number,
        default: 0,
        required: 'Please select a minimum time for reservations (in days)',
        trim: true
    },
    schedules:{
        type: [{
            type: Schema.ObjectId,
            ref: 'Fieldschedule'
        }],
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
