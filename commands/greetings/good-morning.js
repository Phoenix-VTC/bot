const files = [
	'https://media.giphy.com/media/8ag5afaQgk9i92lhXN/giphy.gif',
	'https://media.giphy.com/media/KP54vydXZcJqkfrsCX/giphy.gif',
];

module.exports = {
	name: 'gm',
	aliases: ['morning', 'good-morning'],
	description: 'Replies with a good morning greeting.',
	guildOnly: true,
	execute(message) {
		// message.channel.send('Goooooood mooorning, ' + message.author.toString() + '!', { files: [files[Math.floor(Math.random() * files.length)]] });
	},
};
