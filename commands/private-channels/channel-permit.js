module.exports = {
	name: 'channel-permit',
	description: 'Add one or more users to your private channel',
	aliases: ['allow', 'permit'],
	guildOnly: true,
	requiredRole: 'Bot Tester',
	args: true,
	usage: '<userOne> <userTwo>',
	execute(message) {
		const channel = message.guild.channels.cache.find(c => c.name === message.author.id && c.type === 'voice');

		if (!channel) {
			return message.reply('you don\'t have a private channel.');
		}

		message.mentions.users.forEach(function(user) {
			channel.updateOverwrite(user.id, {
				VIEW_CHANNEL: true,
				CONNECT: true,
			}).then(() => {
				message.channel.send(`**${user.username}** has been given permission to connect to your channel.`);
			}).catch(console.error);
		});

		return message.reply('your private channel has been updated!');
	},
};
