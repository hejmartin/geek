/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bgg = require('bgg');
var BggGame = require('../wrappers/bgg-game');

module.exports = {

	index: function (req, res) {
	},

	details: function (req, res) {
		if (req.param('id')) {
			Game.findOne(req.param('id'))
				.populate('designers')
				.then(function (game) {
					if (game) {
						res.view('game/details', {
							game: game
						});
					}
					else {
						res.notFound();
					}
				})
				.catch(function (err) {
					res.notFound();
				});
		}
		else if (req.param('bggid')) {
			Game.findByBggIdOrCreate(req.param('bggid'), function (err, game) {
				if (err) {
					res.notFound();
				}
				else {
					res.redirect('/game/' + game.id);
				}
			});
		}
	}

};

