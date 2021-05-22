module.exports = {
	name: 'pigeon',
	aliases: ['pidgeon'],
	description: 'Pigeon',
	execute(message) {
		message.channel.send('', { files: ['https://media.giphy.com/media/UI1ZhOe0oeuRy/giphy.gif'] });
	},
};
