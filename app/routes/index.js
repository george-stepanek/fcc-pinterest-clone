'use strict';

var path = process.cwd();
var Handler = require(path + '/app/controllers/handler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
	}

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user);
		});

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/'
		}));
		
	var handler = new Handler();
	app.route('/api/photo/all')
		.get(handler.getAllPhotos);
		
	app.route('/api/photo/user/:id')
		.get(handler.getUserPhotos);
		
	app.route('/api/photo/my')
		.get(isLoggedIn, handler.getMyPhotos)
		.post(isLoggedIn, handler.addPhoto)
		.delete(isLoggedIn, handler.deletePhoto);
};
