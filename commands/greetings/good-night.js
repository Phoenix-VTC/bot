const files = [
	'https://media.giphy.com/media/Bi1sThnWbgPmCvjjJT/giphy.gif',
	'https://media.giphy.com/media/s687WiBK6mtsfY4Q51/giphy.gif',
];

module.exports = {
	name: 'gn',
	aliases: ['night', 'good-night'],
	description: 'Replies with a good night greeting.',
	guildOnly: true,
	execute(message) {
		message.channel.send('Sweet dreams, ' + message.author.toString() + '!', { files: [files[Math.floor(Math.random() * files.length)]] });
	},
};
