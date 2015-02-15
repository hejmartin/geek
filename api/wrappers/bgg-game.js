
/**
 * Wrapper for BGG API json data
 * @param {object} data Json object
 */

var entities = require('entities');

function BggGame (rawdata) {
	var self = this;

	this.data = {};
	this.rawdata = rawdata || {};

	// Simple props
	['thumbnail', 'image', 'id'].forEach(function (prop) {
		Object.defineProperty(self, prop, {
			get: function () {
				self.data[prop] = self.data[prop] || self.rawdata[prop];
				return self.data[prop];
			}
		});
	});
}

BggGame.prototype = {
	get name () {
		if (!this.data.name) {
			if (_.isArray(this.rawdata.name)) {
				this.data.name = _.result(_.find(this.rawdata.name, function (n) {
					return n.type === 'primary';
				}), 'value', '?');
			}
			else {
				this.data.name = this.rawdata.name.value;
			}
		}

		return this.data.name;
	},

	get rank () {
		if (_.isUndefined(this.data.rank)) {
			var rank;

			try {
				rank = _.find(this.rawdata.statistics.ratings.ranks.rank, function (rank) {
					return rank.name === 'boardgame';
				});
			} catch (e) {}

			return parseInt(_.result(rank, 'value', null), 10) || null;
		}

		return this.data.rank;
	},

	get year () {
		this.data.yearpublished = this.data.yearpublished || this.rawdata.yearpublished.value;
		return this.data.yearpublished;
	},

	get description () {
		if (!this.data.description) {
			this.data.description = entities.decodeXML(
				entities.decodeXML(
					this.rawdata.description
				)
			);
		}

		return this.data.description;
	},

	get designers () {
		if (!this.data.designers) {
			this.data.designers = [];

			try {
				this.data.designers = this.rawdata.link.filter(function (link) {
					return link.type === 'boardgamedesigner';
				}).map(function (link) {
					return {
						id: link.id,
						name: link.value
					};
				});
			} catch (e) {}
		}

		return this.data.designers;
	}
};

module.exports = BggGame;