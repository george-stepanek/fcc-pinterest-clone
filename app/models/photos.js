'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Photo = new Schema({
	url: String,
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Photo', Photo);
