const Sentry = require('@sentry/node');

module.exports = {
	name: 'error',
	execute(error) {
		console.log(error);
		Sentry.captureException(error);
	},
};
