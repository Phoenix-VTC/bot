module.exports = {
	name: 'channel-create',
	description: 'Create a private voice channel',
	guildOnly: true,
	requiredRole: 'Bot Tester',
	execute(message) {
		// TODO: Keep empty channels in mind (should be deleted)

		const category = message.guild.channels.cache.find(c => c.name === 'Private Channels' && c.type === 'category');

		if (!category) {
			return message.reply('I couldn\'t find the `Private Channels` category.');
		}

		if (message.guild.channels.cache.find(c => c.name === message.author.id && c.type === 'voice')) {
			return message.reply('you already have a private channel.');
		}

		message.guild.channels.create(message.author.id, {
			type: 'voice',
			parent: category,
			reason: 'User created a private voice channel',
			topic: 'Foo',
			permissionOverwrites: [
				{
					id: message.guild.id,
					deny: ['VIEW_CHANNEL', 'CONNECT'],
				},
				{
					id: message.author.id,
					allow: ['VIEW_CHANNEL', 'CONNECT'],
				},
			],
		}).then(channel => {
			return message.reply(`<#${channel.id}> has been created for you. You can give people permission to join by typing \`!channel-permit <users>\`.`);
		}).catch(console.error);
	},
};
