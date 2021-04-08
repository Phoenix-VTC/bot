const { Command } = require('discord.js-commando');

module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'good-evening',
			aliases: ['ge', 'evening'],
			group: 'greetings',
			memberName: 'good-evening',
			description: 'Replies with a good evening greeting.',
		});
	}

	run(message) {
		return message.say('Good evening to you too, ' + message.author.toString() + '!', { files: ['https://media1.tenor.com/images/36ea079b402b26236f428523f181c32a/tenor.gif'] });
	}
};
