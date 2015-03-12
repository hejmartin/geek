/**
* Game.js
*
* @description :: TODO: You might write a short summary of how this model works.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bgg = require('bgg');
var BggGame = require('../wrappers/bgg-game');

module.exports = {

	attributes: {
		title: 'string',

		bggId: {
			type: 'string',
			unique: true
		},

		imageUrl: 'string',

		thumbnailUrl: 'string',

		description: 'text',

		designers: {
			collection: 'person',
			via: 'games'
		}
	},

	createFromBggData: function (data, cb) {
		var bgg_data = new BggGame(data);

		// Create the game
		Game.create({
			title: bgg_data.name,
			bggId: bgg_data.id,
			description: bgg_data.description,
			imageUrl: bgg_data.image,
			thumbnailUrl: bgg_data.thumbnail,
			bggData: data
		})
			.then(function (game) {
				if (!bgg_data.designers.length) {
					cb(null, game);
				}
				else {
					var designer_count = 0;

					bgg_data.designers.forEach(function (designer) {
						Person.findOrCreate(
							{ bggId: designer.id },
							{ bggId: designer.id, name: designer.name }
						).then(function (record) {
							game.designers.add(record);
							designer_count++;
							// Was this the last one?
							if (designer_count === bgg_data.designers.length) {
								game.save()
									.then(function () {
										cb(null, game);
									})
									.catch(cb);
							}
						});
					});
				}
			})
			.catch(function (err) {
				cb(err);
			});
	},

	findByBggIdOrCreate: function (id, cb) {
		// Look for game in database
		Game.findByBggId(id).then(function (found) {
			if (found.length) {
				cb(null, found[0]);
			}
			else {
				// Fetch game data from bgg
				bgg('thing', { id: id }).then(function (result) {
					if (result.items.item) {
						Game.createFromBggData(result.items.item, function (err, game) {
							if (err) {
								cb(err);
							}
							else {
								cb(null, game);
							}
						});
					}
					else {
						cb(new Error('No game with id ' + id + ' found on Boardgamegeek'));
					}
				});
			}
		});
	}
};