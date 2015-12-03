'use strict';

var Photos = require('../models/photos.js');

function Handler () {
	
	this.addPhoto = function (req, res) {
		if(req.query.url != undefined) {
			var newPhoto = { url: req.query.url, userid: req.user.id };
			Photos.create([newPhoto], function (err, result) { if (err) { throw err; } res.json(result); });
		}
	};
}
module.exports = Handler;