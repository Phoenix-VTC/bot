const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
require('dotenv').config();
const progressbar = require('string-progressbar');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('level')
		.setDescription('Show your or someone else\'s driver level, if they are a member.')
		.addUserOption((option) =>
			option.setName('user').setDescription('The user whose level to check'),
		),
	async execute(interaction) {
		// await interaction.defer({ ephemeral: true });
		//
		// let id;
		// let username;
		//
		// const user = interaction.options.getUser('user');
		//
		// if (!user) {
		// 	id = interaction.member.id;
		// 	username = interaction.member.user.username;
		// }
		// else {
		// 	id = user.id;
		// 	username = user.username;
		// }
		//
		// const response = await fetch(`${process.env.BASE_AUTH_URL}/api/discord-bot/users/${id}`, { headers: { 'token': process.env.BASE_AUTH_TOKEN } });
		//
		// if (response.status === 404) {
		// 	if (id === interaction.member.id) {
		// 		const row = new MessageActionRow()
		// 			.addComponents(
		// 				new MessageButton()
		// 					.setStyle('LINK')
		// 					.setURL('https://base.phoenixvtc.com/settings/socials')
		// 					.setLabel('Link your Discord'),
		// 			)
		// 			.addComponents(
		// 				new MessageButton()
		// 					.setStyle('LINK')
		// 					.setURL('https://apply.phoenixvtc.com')
		// 					.setLabel('Join Phoenix'),
		// 			);
		//
		// 		return await interaction.reply({
		// 			content: '<:No:809018510557577228> We couldn\'t find you on the PhoenixBase!',
		// 			components: [row],
		// 			ephemeral: true,
		// 		});
		// 	}
		//
		// 	return await interaction.reply({
		// 		content: '<:No:809018510557577228> We couldn\'t find this user on the PhoenixBase!',
		// 		ephemeral: true,
		// 	});
		// }
		//
		// const userData = await response.json();
		//
		// const progressBar = progressbar.filledBar(100, userData['percentage_until_level_up'], 20);
		//
		// const embed = new MessageEmbed()
		// 	.setColor('#DC2F02')
		// 	.setTitle(`${username} is **Driver Level ${userData['driver_level']}**`)
		// 	.setThumbnail(userData['profile_picture'])
		// 	.setURL(userData['profile_link'])
		// 	.setDescription(
		// 		'**Progress until next level:** \n' +
		// 		progressBar[0],
		// 	)
		// 	.addField('Event XP', `${userData['event_xp']} XP`, true)
		// 	.addField('Job XP', `${userData['event_xp']} XP`, true)
		// 	.addField('Driver XP', `${userData['driver_points']} XP`, true)
		// 	.setFooter('PhoenixBase', 'https://base.phoenixvtc.com/img/logo.png')
		// 	.setTimestamp();
		//
		// const row = new MessageActionRow()
		// 	.addComponents(
		// 		new MessageButton()
		// 			.setStyle('LINK')
		// 			.setURL(userData['profile_link'])
		// 			.setLabel(`View ${userData['username']}'s Profile`),
		// 	);
		//
		// return await interaction.reply({
		// 	embeds: [embed],
		// 	components: [row],
		// });
	},
};
