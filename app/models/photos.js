'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Photo = new Schema({
	id: { type:Schema.ObjectId, default: mongoose.Types.ObjectId },
	userid: String,
	username: String,
	url: String
});

module.exports = mongoose.model('Photo', Photo);
