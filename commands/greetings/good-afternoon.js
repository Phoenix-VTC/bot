const { Command } = require('discord.js-commando');

module.exports = class GoodAfternoonCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'good-afternoon',
			aliases: ['ga', 'afternoon'],
			group: 'greetings',
			memberName: 'good-afternoon',
			description: 'Replies with a good afternoon greeting.',
		});
	}

	run(message) {
		return message.say('Enjoy the rest of your day, ' + message.author.toString() + '!', { files: ['https://media1.tenor.com/images/13c17157b40df6b90254e5be810caeeb/tenor.gif'] });
	}
};
