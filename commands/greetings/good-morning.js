const { Command } = require('discord.js-commando');

module.exports = class GoodMorningCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'good-morning',
			aliases: ['gm', 'morning'],
			group: 'greetings',
			memberName: 'good-morning',
			description: 'Replies with a good morning greeting.',
		});
	}

	run(message) {
		const files = [
			'https://i.imgur.com/RdDOa3d.gif',
			'https://media.giphy.com/media/KP54vydXZcJqkfrsCX/giphy.gif',
		];

		return message.say('Goooooood mooorning, ' + message.author.toString() + '!', { files: [files[Math.floor(Math.random() * files.length)]] });
	}
};
