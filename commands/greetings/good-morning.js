const { Command } = require('discord.js-commando');

module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'good-morning',
			aliases: ['gm', 'morning'],
			group: 'greetings',
			memberName: 'good morning',
			description: 'Replies with a good morning greeting.',
		});
	}

	run(message) {
		return message.say('Goooooood mooorning, ' + message.author.toString() + '!', { files: ['https://media1.tenor.com/images/127efdbca7933c8df2fdc72c6a671c50/tenor.gif'] });
	}
};
