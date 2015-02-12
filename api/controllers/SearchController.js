/**
 * SearchController
 *
 * @description :: Server-side logic for managing searches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var util = require('util');
var bgg = require('bgg');
var BggGame = require('../wrappers/bgg-game');

function sortGamesByRank (a, b) {
	if (a.rank) {
		return b.rank ? b.rank - a.rank : -1;
	}
	else if (b.rank) {
		return 1;
	}
	else {
		return 0;
	}
}

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
					type: 'boardgame',
					stats: 1
				});
			})
				// Show results
				.then(function (result) {
					var games = [];

					try {
						if (_.isArray(result.items.item)) {
							result.items.item.forEach(function (item) {
								games.push(new BggGame(item));
							});
						}
						else {
							games.push(new BggGame(result.items.item));
						}
					} catch (e) {}

					sails.log(util.inspect(result, {depth:null}));

					//games = games.sort(sortGamesByRank);

					res.view('search/result', {
						title: ('”' + query + '”'),
						query: query,
						games: games
					});
				});
	}
};