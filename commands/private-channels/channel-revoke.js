module.exports = {
	name: 'channel-revoke',
	description: 'Revoke one or more users from your private channel',
	aliases: ['disallow', 'revoke'],
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
				VIEW_CHANNEL: false,
				CONNECT: false,
			}).then(() => {
				message.channel.send(`**${user.username}** has been revoked from your channel.`);
			}).catch(console.error);
		});

		return message.reply('your private channel has been updated!');
	},
};
