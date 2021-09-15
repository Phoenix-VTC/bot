const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('together')
		.setDescription('Create a Together invite for the voice channel you are currently in.')
		.addStringOption((option) =>
			option
				.setName('activity')
				.setDescription('Which activity do you want to start?')
				.addChoices([
					['YouTube', 'youtube'],
					['Poker', 'poker'],
					['Betrayal', 'betrayal'],
					['Fishing', 'fishing'],
					['Chess', 'chess'],
				])
				.setRequired(true),
		),
	async execute(interaction) {
		// Check if the user is in a voice channel
		if (!interaction.member.voice.channel) {
			return await interaction.reply({
				content: 'Please join a voice channel first, then try again.',
				ephemeral: true,
			});
		}

		const activity = interaction.options.getString('activity');

		interaction.client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, activity).then(async invite => {
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setStyle('LINK')
						.setURL(invite.code)
						.setLabel('Join Activity'),
				);

			return await interaction.reply({
				content: `I created a **${activity.charAt(0).toUpperCase() + activity.slice(1)} Together** session! Press the button below to join.`,
				components: [row],
			});
		});
	},
};
