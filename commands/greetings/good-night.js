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
		const files = [
			'https://i.imgur.com/aA9VGHd.gif',
			'https://media.giphy.com/media/s687WiBK6mtsfY4Q51/giphy.gif',
		];

		return message.say('Sweet dreams, ' + message.author.toString() + '!', { files: [files[Math.floor(Math.random() * files.length)]] });
	}
};
