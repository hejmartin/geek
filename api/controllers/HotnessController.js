/**
 * HotnessController
 *
 * @description :: Server-side logic for managing hotnesses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bgg = require('bgg');

module.exports = {
	index: function (req, res) {
		bgg('hot', {type: 'boardgame'})
			.then(function (results) {
				return res.view('hotness/index', results);
			});
	}
};

