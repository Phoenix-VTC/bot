const files = [
	'https://media.giphy.com/media/8ag5afaQgk9i92lhXN/giphy.gif',
	'https://media.giphy.com/media/KP54vydXZcJqkfrsCX/giphy.gif',
];

module.exports = {
	name: 'gm',
	aliases: ['morning', 'good-morning'],
	description: 'Replies with a good morning greeting.',
	execute(message) {
		message.channel.send('Goooooood mooorning, ' + message.author.toString() + '!', { files: [files[Math.floor(Math.random() * files.length)]] });
	},
};


// const { Command } = require('discord.js-commando');
//
// module.exports = class GoodMorningCommand extends Command {
// 	constructor(client) {
// 		super(client, {
// 			name: 'good-morning',
// 			aliases: ['gm', 'morning'],
// 			group: 'greetings',
// 			memberName: 'good-morning',
// 			description: 'Replies with a good morning greeting.',
// 		});
// 	}
//
// 	run(message) {
// 		const files = [
// 			'https://i.imgur.com/RdDOa3d.gif',
// 			'https://media.giphy.com/media/KP54vydXZcJqkfrsCX/giphy.gif',
// 		];
//
// 		return message.say('Goooooood mooorning, ' + message.author.toString() + '!', { files: [files[Math.floor(Math.random() * files.length)]] });
// 	}
// };
