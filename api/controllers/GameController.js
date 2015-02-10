/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

bgg = require('bgg');

module.exports = {

	index: function (req, res) {

	},

	details: function (req, res) {
		sails.log('Requesting game with id: ' + req.param('id'));

		// Fetch game data
		bgg('thing', { id: req.param('id') })
			.then(function (result) {
				if (result.items.item) {
					var item = result.items.item;
					var name = '';

					// For games with alternate names
					if (Object.prototype.toString.call(item.name) === '[object Array]') {
						name = item.name[0].value;
					}
					// For games with just a primary name
					else {
						name = item.name.value;
					}

					res.view('game/details', {
						game: {
							name: name,
							image: item.image
						}
					});
				}
				else {
					res.notFound();
				}
			});
	}

};

