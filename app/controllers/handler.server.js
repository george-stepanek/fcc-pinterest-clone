'use strict';

var User = require('../models/users');
var Photo = require('../models/photos.js');

function Handler () {

	this.getAllPhotos = function (req, res) {
		Photo.find({ }).populate('user').exec(function (err, results) { if (err) { throw err; } res.json(results); });
	};

	this.getUserPhotos = function (req, res) {
		User.findOne({ 'id': req.params.id }, function (err, user) { if (err) { throw err; }
			if (user) {
				Photo.find({ 'user': user._id }).populate('user').exec(function (err, results) { if (err) { throw err; } res.json(results); });
			}
		});
	};
	
	this.getMyPhotos = function (req, res) {
		User.findOne({ 'id': req.user.id }, function (err, user) { if (err) { throw err; }
			if (user) {
				Photo.find({ 'user': user._id }).populate('user').exec(function (err, results) { if (err) { throw err; } res.json(results); });
			}
		});
	};
	
	this.addPhoto = function (req, res) {
		User.findOne({ 'id': req.user.id }, function (err, user) { if (err) { throw err; }
			if (user) {
				if(req.query.url != undefined) {
					var photo = new Photo({ url: req.query.url, user: user });
					Photo.create(photo, function (err, result) { if (err) { throw err; } res.json(result); });
				}
			}
		});
	};
	
	this.deletePhoto = function (req, res) {
		if(req.query.photoid != undefined) {
			Photo.findOneAndRemove({ '_id': req.query.photoid }, function (err, result) { if (err) { throw err; } res.json(result); });
		}
	};
}
module.exports = Handler;