'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Day Schema
 */
var DaySchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Day name',
        trim: true
    },
    number: {
        type: Number,
        min: 1,
        max: 7,
        required: 'Please fill Day number',
        trim: true,
        index: {
            unique: true
        }
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

mongoose.model('Day', DaySchema);
