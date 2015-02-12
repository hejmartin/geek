
/**
 * Wrapper for BGG API json data
 * @param {object} data Json object
 */
function BggGame (rawdata) {
	this.data = {};
	this.rawdata = rawdata || {};
}

BggGame.prototype = {
	get id () {
		this.data.id = this.data.id || this.rawdata.id;
		return this.data.id;
	},

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

	get thumbnail () {
		this.data.thumbnail = this.data.thumbnail || this.rawdata.thumbnail;
		return this.data.thumbnail;
	}
};

module.exports = BggGame;