/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

	'get /login': 'AuthController.login',
	'get /logout': 'AuthController.logout',
	'get /register': 'AuthController.register',

	'post /auth/local': 'AuthController.callback',
	'post /auth/local/:action': 'AuthController.callback',

	'get /auth/:provider': 'AuthController.provider',
	'get /auth/:provider/callback': 'AuthController.callback',

	'/': {view: 'homepage'},
	'/styleguide': {view: 'styleguide'},

	// Search
	'/search': 'SearchController.search',

	// Games
	'/game': 'GameController.index',
	'/game/bgg/:bggid': 'GameController.details',
	'/game/:id': 'GameController.details',
	'/game/:id/:slug': 'GameController.details',

	// Designers
	'/designer/bgg/:bggid': 'PersonController.details',
	'/designer/:id': 'PersonController.details',

	/***************************************************************************
	*                                                                          *
	* Custom routes here...                                                    *
	*                                                                          *
	*  If a request to a URL doesn't match any of the custom routes above, it  *
	* is matched against Sails route blueprints. See `config/blueprints.js`    *
	* for configuration options and examples.                                  *
	*                                                                          *
	***************************************************************************/

};
