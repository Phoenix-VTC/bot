const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Show your or someone else\'s PhoenixBase balance, if they are a member.')
		.addUserOption((option) =>
			option.setName('user').setDescription('The user whose balance to check'),
		),
	async execute(interaction) {
		await interaction.defer({ ephemeral: true });

		let id;
		let username;

		const user = interaction.options.getUser('user');

		if (!user) {
			id = interaction.member.id;
			username = interaction.member.user.username;
		}
		else {
			id = user.id;
			username = user.username;
		}

		const response = await fetch(`${process.env.BASE_AUTH_URL}/api/discord-bot/users/${id}`, { headers: { 'token': process.env.BASE_AUTH_TOKEN } });

		if (response.status === 404) {
			if (id === interaction.member.id) {
				const row = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setStyle('LINK')
							.setURL('https://base.phoenixvtc.com/settings/socials')
							.setLabel('Link your Discord'),
					)
					.addComponents(
						new MessageButton()
							.setStyle('LINK')
							.setURL('https://apply.phoenixvtc.com')
							.setLabel('Join Phoenix'),
					);

				return await interaction.reply({
					content: '<:No:809018510557577228> We couldn\'t find you on the PhoenixBase!',
					components: [row],
					ephemeral: true,
				});
			}

			return await interaction.reply({
				content: '<:No:809018510557577228> We couldn\'t find this user on the PhoenixBase!',
				ephemeral: true,
			});
		}

		const userData = await response.json();

		const embed = new MessageEmbed()
			.setColor('#DC2F02')
			.setTitle(`${username}'s Information`)
			.setThumbnail(userData['profile_picture'])
			.setURL(userData['profile_link'])
			.addField('Wallet', `€ ${userData['wallet_balance']}`)
			.addField('Event XP', `${userData['event_xp']} XP`)
			.setFooter('PhoenixBase', 'https://base.phoenixvtc.com/img/logo.png')
			.setTimestamp();

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(userData['profile_link'])
					.setLabel(`View ${userData['username']}'s Profile`),
			);

		return await interaction.reply({
			embeds: [embed],
			components: [row],
		});
	},
};
