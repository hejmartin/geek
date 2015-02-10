/**
 * SearchController
 *
 * @description :: Server-side logic for managing searches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var util = require('util');
var bgg = require('bgg');

module.exports = {
	search: function (req, res) {
		var query = req.param('query');

		// Search for games
		bgg('search', {
			query: query,
			type: 'boardgame'
		})
			// Request more info about found games
			.then(function (result) {
				var ids = result.items.item.map(function (item) {
					return item.id;
				});

				return bgg('thing', {
					id: ids.join(','),
					type: 'boardgame'
				});
			})
				// Show results
				.then(function (result) {
					sails.log(util.inspect(result, {depth:null}));

					// Make sure we're working with an array, even
					// if just one game.
					var games = [].concat(result.items.item);

					res.view('search/result', {
						query: query,
						games: games
					});
				});
	}
};