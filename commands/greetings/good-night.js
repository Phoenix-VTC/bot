const { Command } = require('discord.js-commando');

module.exports = class GoodNightCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'good-night',
			aliases: ['gn', 'night'],
			group: 'greetings',
			memberName: 'good-night',
			description: 'Replies with a good night greeting.',
		});
	}

	run(message) {
		return message.say('Sweet dreams, ' + message.author.toString() + '!', { files: ['https://media1.tenor.com/images/3c15ee9f4b4277389d0573e8ded3f015/tenor.gif'] });
	}
};
