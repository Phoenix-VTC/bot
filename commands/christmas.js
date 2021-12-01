const { SlashCommandBuilder } = require('@discordjs/builders');

const christmasFile = 'https://media0.giphy.com/media/gxDI9ZJ2kbwFMqi2tC/giphy.gif';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('christmas')
		.setDescription('Merry Christmas!'),
	async execute(interaction) {
		await interaction.reply({
			content: `Merry Christmas, ${interaction.member.toString()}!`,
			files: [christmasFile],
		});
	},
};
