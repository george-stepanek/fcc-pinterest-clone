'use strict';

var Photos = require('../models/photos.js');

function Handler () {

	this.getAllPhotos = function (req, res) {
		Photos.find({ }).exec(function (err, results) { if (err) { throw err; } res.json(results); });
	};

	this.getUserPhotos = function (req, res) {
		Photos.find({ 'userid': req.params.id }).exec(function (err, results) { if (err) { throw err; } res.json(results); });
	};
	
	this.getMyPhotos = function (req, res) {
		Photos.find({ 'userid': req.user.id }).exec(function (err, results) { if (err) { throw err; } res.json(results); });
	};
	
	this.addPhoto = function (req, res) {
		if(req.query.url != undefined) {
			var newPhoto = { url: req.query.url, userid: req.user.id, username: req.user.displayName, userphoto: req.user.photo };
			Photos.create([newPhoto], function (err, result) { if (err) { throw err; } res.json(result); });
		}
	};
	
	this.deletePhoto = function (req, res) {
		if(req.query.photoid != undefined) {
			Photos.findOneAndRemove({ 'id': req.query.photoid }, function (err, result) { if (err) { throw err; } res.json(result); });
		}
	};
}
module.exports = Handler;