const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Make the bot say something.')
		.addChannelOption((option) =>
			option.setName('channel')
				.setDescription('The channel where the message should be posted.')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option.setName('text')
				.setDescription('The text the message should contain.')
				.setRequired(true),
		),
	requiredRole: 'Management',
	async execute(interaction) {
		const channel = interaction.options.getChannel('channel');
		const text = interaction.options.getString('text');

		if (channel.type !== 'GUILD_TEXT') {
			return await interaction.reply({
				content: '<:No:809018510557577228> The channel needs to be a text channel!',
				ephemeral: true,
			});
		}

		await channel.send(text);

		return await interaction.reply({
			content: '<:Tick:809018510504230974> The message has been sent!',
			ephemeral: true,
		});
	},
};
