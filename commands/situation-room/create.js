const randomstring = require('randomstring');
const { MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');

module.exports = {
	name: 'situation-create',
	description: 'Create a new situation room',
	guildOnly: true,
	requiredRole: 'Bot Tester',
	args: true,
	usage: '@user',
	execute(message) {
		const category = message.guild.channels.cache.find(c => c.name === 'Private Channels' && c.type === 'category');

		if (!category) {
			return message.reply('I couldn\'t find the `Situation Rooms` category.');
		}

		const driver = message.mentions.members.first().user;

		message.guild.channels.create(`Room ${randomstring.generate(7)}`, {
			type: 'text',
			parent: category,
			reason: 'User created new situation room',
			permissionOverwrites: [
				{
					id: message.guild.id,
					deny: ['VIEW_CHANNEL'],
				},
				{
					id: message.author.id,
					allow: ['VIEW_CHANNEL'],
				},
				{
					id: driver.id,
					allow: ['VIEW_CHANNEL'],
				},
			],
		}).then(channel => {
			const embed = new MessageEmbed()
				.setColor('#DC2F02')
				.setTitle('Situation room created')
				.setDescription('All messages in this channel are automatically saved.')
				.addField('Associate', message.author)
				.addField('Driver', driver)
				.setFooter('PhoenixVTC', 'https://base.phoenixvtc.com/img/logo.png')
				.setTimestamp();

			const closeChannelButton = new MessageButton()
				.setStyle('red')
				.setEmoji('✖')
				.setLabel('Close room')
				.setID('click_to_function');

			return channel.send(embed, closeChannelButton);
		}).catch(console.error);

		message.client.on('clickButton', async (button) => {
			await button.reply.think(true);

			// Check if the user has the Bot Tester role
			await button.clicker.fetch().then(user => {
                if (!user.roles.cache.some(role => role.name === 'Bot Tester')) {
                    // await button.reply.send('You cannot do this.', true);
                }
			});

			await button.reply.edit('Saving transcript...');
		});
	},
};
