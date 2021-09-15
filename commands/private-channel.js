const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('channel')
		.setDescription('Manage a private voice channel.')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('create')
				.setDescription('Create a private voice channel.'),
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('delete')
				.setDescription('Delete your private voice channel.'),
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('permit')
				.setDescription('Add a user to your private channel.')
				.addUserOption((option) =>
					option.setName('user').setDescription('The user you want to add').setRequired(true),
				),
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('revoke')
				.setDescription('Revoke one or more users from your private channel.')
				.addUserOption((option) =>
					option.setName('user').setDescription('The user you want to remove').setRequired(true),
				),
		),
	requiredRole: 'Bot Tester',
	async execute(interaction) {
		await interaction.defer({ ephemeral: true });

		switch (interaction.options.getSubcommand()) {
		case 'create':
			await channelCreate(interaction);
			break;
		case 'delete':
			await channelDelete(interaction);
			break;
		case 'permit':
			await channelPermit(interaction);
			break;
		case 'revoke':
			await channelRevoke(interaction);
			break;
		}
	},
};

async function channelCreate(interaction) {
	// TODO: Keep empty channels in mind (should be deleted)

	const category = interaction.guild.channels.cache.find(c => c.name === 'Private Channels' && c.type === 'GUILD_CATEGORY');

	if (!category) {
		return await interaction.reply({
			content: '<:No:809018510557577228> I couldn\'t find the `Private Channels` category.',
			ephemeral: true,
		});
	}

	if (interaction.guild.channels.cache.find(c => c.name === interaction.member.id && c.type === 'GUILD_VOICE')) {
		return await interaction.reply({
			content: '<:No:809018510557577228> You already have a private channel.',
			ephemeral: true,
		});
	}

	interaction.guild.channels.create(interaction.member.id, {
		type: 'GUILD_VOICE',
		parent: category,
		reason: 'User created a private voice channel',
		permissionOverwrites: [
			{
				id: interaction.guild.id,
				deny: ['VIEW_CHANNEL', 'CONNECT'],
			},
			{
				id: interaction.member.id,
				allow: ['VIEW_CHANNEL', 'CONNECT'],
			},
		],
	}).then(async channel => {
		return await interaction.reply(`<#${channel.id}> has been created for you. You can give people permission to join by typing \`/channel permit @user\`.`);
	}).catch(console.error);
}

async function channelDelete(interaction) {
	const channel = interaction.guild.channels.cache.find(c => c.name === interaction.member.id && c.type === 'GUILD_VOICE');

	if (!channel) {
		return await interaction.reply({
			content: '<:No:809018510557577228> You don\'t have a private channel.',
			ephemeral: true,
		});
	}

	channel.delete('User deleted their private voice channel');

	return await interaction.reply('<:Tick:809018510504230974> Your private channel has been deleted!');
}

async function channelPermit(interaction) {
	const channel = interaction.guild.channels.cache.find(c => c.name === interaction.member.id && c.type === 'GUILD_VOICE');

	if (!channel) {
		return interaction.reply('<:No:809018510557577228> You don\'t have a private channel.');
	}

	const user = interaction.options.getUser('user');

	channel.permissionOverwrites.edit(user.id, {
		VIEW_CHANNEL: true,
		CONNECT: true,
	}).then(async () => {
		await interaction.reply(`**${user.toString()}** has been given permission to connect to your channel.`);
	}).catch(console.error);

	return await interaction.followUp('<:Tick:809018510504230974> Your private channel has been updated!');
}

async function channelRevoke(interaction) {
	const channel = interaction.guild.channels.cache.find(c => c.name === interaction.member.id && c.type === 'GUILD_VOICE');

	if (!channel) {
		return interaction.reply('<:No:809018510557577228> You don\'t have a private channel.');
	}

	const user = interaction.options.getUser('user');

	channel.permissionOverwrites.edit(user.id, {
		VIEW_CHANNEL: false,
		CONNECT: false,
	}).then(async () => {
		await interaction.reply(`**${user.toString()}** has been revoked from your channel.`);
	}).catch(console.error);

	return await interaction.followUp('<:Tick:809018510504230974> Your private channel has been updated!');
}
