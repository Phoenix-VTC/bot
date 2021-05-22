const files = [
	'https://media.giphy.com/media/10jdVGPxskeUSDq94U/giphy.gif',
	'https://media.giphy.com/media/b6n2AnLuEJQ15dMoVu/giphy.gif',
];

module.exports = {
	name: 'ge',
	aliases: ['evening', 'good-evening'],
	description: 'Replies with a good evening greeting.',
	execute(message) {
		message.channel.send('Good evening to you too, ' + message.author.toString() + '!', { files: [files[Math.floor(Math.random() * files.length)]] });
	},
};


// const { Command } = require('discord.js-commando');
//
// module.exports = class GoodEveningCommand extends Command {
// 	constructor(client) {
// 		super(client, {
// 			name: 'good-evening',
// 			aliases: ['ge', 'evening'],
// 			group: 'greetings',
// 			memberName: 'good-evening',
// 			description: 'Replies with a good evening greeting.',
// 		});
// 	}
//
// 	run(message) {
// 		const files = [
// 			'https://i.imgur.com/Ak2X4cO.gif',
// 			'https://media.giphy.com/media/b6n2AnLuEJQ15dMoVu/giphy.gif',
// 		];
//
// 		return message.say('Good evening to you too, ' + message.author.toString() + '!', { files: [files[Math.floor(Math.random() * files.length)]] });
// 	}
// };
