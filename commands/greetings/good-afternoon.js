const files = [
	'https://media.giphy.com/media/bhiAZtmf0k4UetKpNB/giphy.gif',
	'https://media.giphy.com/media/rQRkYSE52JYJGAurMT/giphy.gif',
];

module.exports = {
	name: 'ga',
	aliases: ['afternoon', 'good-afternoon'],
	description: 'Replies with a good afternoon greeting.',
	execute(message) {
		message.channel.send('Enjoy the rest of your day, ' + message.author.toString() + '!', { files: [files[Math.floor(Math.random() * files.length)]] });
	},
};


// const { Command } = require('discord.js-commando');
//
// module.exports = class GoodAfternoonCommand extends Command {
// 	constructor(client) {
// 		super(client, {
// 			name: 'good-afternoon',
// 			aliases: ['ga', 'afternoon'],
// 			group: 'greetings',
// 			memberName: 'good-afternoon',
// 			description: 'Replies with a good afternoon greeting.',
// 		});
// 	}
//
// 	run(message) {
// 		const files = [
// 			'https://i.imgur.com/Q14HVkr.gif',
// 			'https://media.giphy.com/media/rQRkYSE52JYJGAurMT/giphy.gif',
// 		];
//
// 		return message.say('Enjoy the rest of your day, ' + message.author.toString() + '!', { files: [files[Math.floor(Math.random() * files.length)]] });
// 	}
// };
