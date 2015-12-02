'use strict';

var Users = require('../models/users.js');

function Handler () {
	
	this.addGoing = function (req, res) {
		Users.findOneAndUpdate({ 'id': req.user.id }, { 'goingTo': req.query.goingto })
			.exec(function (err, result) { if (err) { throw err; } res.json(result); });
	}
}
module.exports = Handler;