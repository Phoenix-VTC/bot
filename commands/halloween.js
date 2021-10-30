const { SlashCommandBuilder } = require('@discordjs/builders');

const halloweenFile = 'https://media.giphy.com/media/9oQzOvgU7XwjnDkJYZ/giphy.gif';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('halloween')
		.setDescription('Happy halloween!'),
	async execute(interaction) {
		await interaction.reply({
			content: `Happy Halloween, ${interaction.member.toString()}!`,
			files: [halloweenFile],
		});
	},
};
