/**
 * PersonController
 *
 * @description :: Server-side logic for managing people
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	details: function (req, res) {
		if (!req.param('id')) {
			res.notFound();
		}
		else {
			Person.findOne(req.param('id'))
				.populate('games')
				.then(function (person) {
					console.log(person);
					res.view('person/details', {
						person: person
					});
				})
				.catch(function (err) {
					res.notFound();
				});
		}
	}
};

