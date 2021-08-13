module.exports = {
	name: 'channel-delete',
	description: 'Delete your private voice channel',
	guildOnly: true,
	requiredRole: 'Bot Tester',
	execute(message) {
		const channel = message.guild.channels.cache.find(c => c.name === message.author.id && c.type === 'voice');

		if (!channel) {
			return message.reply('you don\'t have a private channel.');
		}

		channel.delete('User deleted their private voice channel');

		return message.reply('your private channel has been deleted!');
	},
};
