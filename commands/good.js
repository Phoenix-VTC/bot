const { SlashCommandBuilder } = require('@discordjs/builders');

const morningFiles = [
	'https://media.giphy.com/media/8ag5afaQgk9i92lhXN/giphy.gif',
	'https://media.giphy.com/media/KP54vydXZcJqkfrsCX/giphy.gif',
];
const afternoonFiles = [
	'https://media.giphy.com/media/bhiAZtmf0k4UetKpNB/giphy.gif',
	'https://media.giphy.com/media/rQRkYSE52JYJGAurMT/giphy.gif',
];
const eveningFiles = [
	'https://media.giphy.com/media/10jdVGPxskeUSDq94U/giphy.gif',
	'https://media.giphy.com/media/b6n2AnLuEJQ15dMoVu/giphy.gif',
];
const nightFiles = [
	'https://media.giphy.com/media/Bi1sThnWbgPmCvjjJT/giphy.gif',
	'https://media.giphy.com/media/s687WiBK6mtsfY4Q51/giphy.gif',
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('good')
		.setDescription('Replies with a greeting.')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('morning')
				.setDescription('Replies with a good morning greeting.'),
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('afternoon')
				.setDescription('Replies with a good afternoon greeting.'),
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('evening')
				.setDescription('Replies with a good evening greeting.'),
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('night')
				.setDescription('Replies with a good night greeting.'),
		),
	async execute(interaction) {
		switch (interaction.options.getSubcommand()) {
		case 'morning':
			await interaction.reply({
				content: `Goooooood mooorning, ${interaction.member.toString()}!`,
				files: [morningFiles.random()],
			});
			break;
		case 'afternoon':
			await interaction.reply({
				content: `Enjoy the rest of your day, ${interaction.member.toString()}!`,
				files: [afternoonFiles.random()],
			});
			break;
		case 'evening':
			await interaction.reply({
				content: `Good evening to you too, ${interaction.member.toString()}!`,
				files: [eveningFiles.random()],
			});
			break;
		case 'night':
			await interaction.reply({
				content: `Sweet dreams, ${interaction.member.toString()}!`,
				files: [nightFiles.random()],
			});
			break;
		}
	},
};

Array.prototype.random = function() {
	return this[Math.floor((Math.random() * this.length))];
};
