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
		sails.log('Requesting game with id: ' + req.param('id'));

		// Fetch game data
		bgg('thing', { id: req.param('id') })
			.then(function (result) {
				if (result.items.item) {
					var game = new BggGame(result.items.item);

					res.view('game/details', {
						game: game
					});
				}
				else {
					res.notFound();
				}
			});
	}

};

