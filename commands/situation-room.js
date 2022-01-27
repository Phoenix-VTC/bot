const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('situation-room')
		.setDescription('Manage HR situation rooms.')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('create')
				.setDescription('Create a new situation room.')
				.addUserOption((option) =>
					option.setName('user').setDescription('The user that should have access to the situation room.').setRequired(true),
				),
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('archive')
				.setDescription('Archive the current situation room.'),
		),
	requiredRole: 'Human Resources Team',
	async execute(interaction) {
		await interaction.defer({ ephemeral: true });

		switch (interaction.options.getSubcommand()) {
		case 'create':
			await channelCreate(interaction);
			break;
		case 'archive':
			await channelArchive(interaction);
			break;
		}
	},
};

async function channelCreate(interaction) {
	const category = interaction.guild.channels.cache.find(c => c.name === '⚠ | Situation Rooms' && c.type === 'GUILD_CATEGORY');

	// Check if the Situation Rooms category exists
	if (!category) {
		return await interaction.reply({
			content: '<:No:809018510557577228> I couldn\'t find the `⚠ | Situation Rooms` category.',
			ephemeral: true,
		});
	}

	// Check if the command was sent in the #human-resources channel
	if (interaction.channel.name !== 'human-resources') {
		return await interaction.reply({
			content: '<:No:809018510557577228> You can only create situation rooms in the `#human-resources` channel.',
			ephemeral: true,
		});
	}

	// Get the user that will have access to the situation room
	const user = interaction.options.getUser('user');

	// Create the situation room channel
	await interaction.guild.channels.create(user.username, {
		type: 'GUILD_TEXT',
		parent: category,
		reason: `${interaction.member.user.username} created a new situation room.`,
		permissionOverwrites: [
			{
				id: interaction.guild.id,
				deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
			},
			{
				id: user.id,
				allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
			},
		],
	}).then(async channel => {
		// Create the situation room embed
		const embed = new MessageEmbed()
			.setTitle('Important! Please read this message.')
			.setColor(15228164)
			.setThumbnail('https://i.imgur.com/4EAM4Ig.png')
			.setDescription(`Hey ${user.toString()}! This situation room channel has been created by ${interaction.member.user.toString()} to discuss some important matters. \n \n` +
				'**If you have read this message, please let us know by posting a message in this channel.** \n \n' +
				'A member of our Human Resources Team will be with you shortly.')
			.setFooter('PhoenixVTC', 'https://base.phoenixvtc.com/img/logo.png');

		// Send the embed + ping the creator & user
		channel.send({
			content: `${user.toString()} ${interaction.member.user.toString()}`,
			embeds: [embed],
		}).then(async (msg) => {
			// Pin the message
			await msg.pin();

			// Create the "Go to channel" button
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setStyle('LINK')
						.setURL(msg.url)
						.setLabel('Go to channel'),
				);

			return await interaction.reply({
				content: `<#${channel.id}> has been created, and ${user.toString()} has access to read and write messages (including message history).`,
				components: [row],
			});
		});
	}).catch(console.error);
}

async function channelArchive(interaction) {
	const archiveCategory = interaction.guild.channels.cache.find(c => c.name === 'Situation Room Archive' && c.type === 'GUILD_CATEGORY');

	if (!archiveCategory) {
		return await interaction.reply({
			content: '<:No:809018510557577228> I couldn\'t find the `Situation Room Archive` category.',
			ephemeral: true,
		});
	}

	// Check if the channel is a situation room
	if (interaction.channel.parent.name !== '⚠ | Situation Rooms') {
		return await interaction.reply({
			content: '<:No:809018510557577228> The channel you are trying to archive is not a situation room.',
			ephemeral: true,
		});
	}

	// Sync the channel permissions with the category's permissions
	await interaction.channel.lockPermissions();

	// Move the channel to the archive category
	await interaction.channel.setParent(archiveCategory, {
		reason: `${interaction.member.user.username} archived the situation room.`,
	});

	// Append the channel name with -archived
	await interaction.channel.setName(`${interaction.channel.name}-archived`);

	return await interaction.reply(`<:Tick:809018510504230974> <#${interaction.channel.id}> has been archived, and the user's read & write permissions have been revoked!!`);
}
